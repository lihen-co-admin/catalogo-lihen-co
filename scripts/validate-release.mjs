import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const notes = [];

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, extension) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if ([".git", "node_modules", "data-private"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, extension));
    else if (!extension || path.extname(entry.name) === extension) files.push(full);
  }

  return files;
}

const requiredFiles = [
  ".nojekyll",
  "404.html",
  "index.html",
  "admin.html",
  "invitaciones/index.html",
  "js/config/env.example.js",
  "netlify.toml",
  "README.md"
];

for (const file of requiredFiles) {
  if (!await exists(path.join(root, file))) {
    errors.push(`Archivo requerido para despliegue inexistente: ${file}`);
  }
}
notes.push(`${requiredFiles.length} archivos críticos de despliegue revisados.`);

const activeFiles = [
  ...(await walk(path.join(root, "js"), ".js")),
  ...(await walk(root, ".html"))
].filter((file) => !file.includes(`${path.sep}legacy${path.sep}`));

for (const file of activeFiles) {
  const source = await readFile(file, "utf8");
  const relative = path.relative(root, file).replaceAll("\\", "/");

  if (/service_role/i.test(source) && !relative.endsWith("env.example.js")) {
    errors.push(`Referencia prohibida a service_role en archivo activo: ${relative}`);
  }

  if (/https?:\/\/localhost(?::\d+)?/i.test(source)) {
    errors.push(`Referencia a localhost en archivo activo: ${relative}`);
  }

  if (path.extname(file) === ".html") {
    const blankLinks = [...source.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)];
    for (const match of blankLinks) {
      if (!/rel=["'][^"']*noopener/i.test(match[0])) {
        errors.push(`Enlace target=_blank sin rel=noopener en ${relative}.`);
      }
    }
  }
}
notes.push(`${activeFiles.length} archivos activos revisados para publicación.`);

const ignoredEnv = await readFile(path.join(root, ".gitignore"), "utf8");
if (!/^js\/config\/env\.js$/m.test(ignoredEnv)) {
  errors.push(".gitignore no protege js/config/env.js.");
}
notes.push("Protección de configuración local revisada.");

console.log("\nVALIDACIÓN DE PUBLICACIÓN LIHEN.CO");
for (const note of notes) console.log(`✓ ${note}`);

if (errors.length) {
  console.error(`\nSe encontraron ${errors.length} bloqueo(s) de publicación:`);
  errors.forEach((error, index) => console.error(`${index + 1}. ${error}`));
  process.exit(1);
}

console.log("\n✓ Rama preparada para revisión, integración y despliegue.\n");
