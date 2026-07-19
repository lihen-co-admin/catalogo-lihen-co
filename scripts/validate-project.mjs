import { readdir, readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const errors = [];
const notes = [];

async function walk(dir, extensions = null) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, extensions));
    else if (!extensions || extensions.includes(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

async function exists(file) {
  try { await access(file, constants.F_OK); return true; } catch { return false; }
}

const jsFiles = await walk(path.join(root, 'js'), ['.js']);
for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) errors.push(`Sintaxis JavaScript: ${relative(file)}\n${result.stderr.trim()}`);
}
notes.push(`${jsFiles.length} archivos JavaScript revisados.`);

const htmlFiles = await walk(root, ['.html']);
const localRefPattern = /(?:src|href)=["']([^"']+)["']/g;
for (const file of htmlFiles) {
  const text = await readFile(file, 'utf8');
  if (/\sonclick\s*=/i.test(text)) errors.push(`Evento onclick encontrado en ${relative(file)}.`);

  for (const match of text.matchAll(localRefPattern)) {
    const ref = match[1];
    if (!ref || ref.startsWith('#') || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
    const clean = ref.split(/[?#]/)[0];
    if (!clean) continue;
    const target = path.resolve(path.dirname(file), clean);
    if (!await exists(target)) errors.push(`Referencia local inexistente en ${relative(file)}: ${ref}`);
  }
}
notes.push(`${htmlFiles.length} páginas HTML revisadas.`);

const migrationDir = path.join(root, 'supabase', 'migrations');
const migrations = (await readdir(migrationDir)).filter((name) => name.endsWith('.sql')).sort();
for (let index = 0; index < migrations.length; index += 1) {
  const expected = String(index + 1).padStart(3, '0');
  if (!migrations[index].startsWith(`${expected}_`)) {
    errors.push(`Secuencia de migraciones inesperada: ${migrations[index]} debería iniciar con ${expected}_.`);
  }
}
notes.push(`${migrations.length} migraciones SQL encontradas en secuencia.`);

const envPath = path.join(root, 'js', 'config', 'env.js');
const envText = await readFile(envPath, 'utf8');
if (/service_role/i.test(envText)) errors.push('env.js contiene una referencia a service_role. Esa clave no debe estar en el frontend.');
if (/SUPABASE_(?:URL|ANON_KEY):\s*["'][^"']{20,}["']/.test(envText)) {
  errors.push('env.js parece contener credenciales reales. Deben retirarse antes de compartir el ZIP.');
}

const productDataPath = path.join(root, 'js', 'data', 'products.js');
if (await exists(productDataPath)) {
  const productText = await readFile(productDataPath, 'utf8');
  const imageRefs = [...productText.matchAll(/[\"'](\.\/assets\/productos\/[^\"']+)[\"']/g)].map((m) => m[1]);
  for (const ref of new Set(imageRefs)) {
    const target = path.resolve(root, ref.replace(/^\.\//, ''));
    if (!await exists(target)) errors.push(`Imagen de producto inexistente: ${ref}`);
  }
  notes.push(`${new Set(imageRefs).size} referencias de imágenes de producto revisadas.`);
}

console.log('\nVALIDACIÓN INTEGRAL LIHEN.CO');
for (const note of notes) console.log(`✓ ${note}`);
if (errors.length) {
  console.error(`\nSe encontraron ${errors.length} problema(s):`);
  errors.forEach((error, index) => console.error(`\n${index + 1}. ${error}`));
  process.exit(1);
}
console.log('\n✓ Proyecto listo para pruebas manuales y despliegue de preproducción.\n');
