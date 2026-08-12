import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('env productivo queda versionable y configurado', () => {
  const env = read('js/config/env.js');
  const gitignore = read('.gitignore');
  assert.match(env, /SUPABASE_URL:\s*['"]https:\/\/[a-z0-9]+\.supabase\.co['"]/i);
  assert.match(env, /SUPABASE_PUBLISHABLE_KEY:\s*['"]sb_publishable_[A-Za-z0-9_-]+['"]/);
  assert.match(env, /CATALOG_SOURCE:\s*['"]auto['"]/);
  assert.doesNotMatch(gitignore, /^js\/config\/env\.js$/m);
});

test('repository de catálogo usa REST nativo y solo catalog_public', () => {
  const repo = read('js/repositories/catalogRepository.js');
  assert.match(repo, /rest\/v1\/catalog_public/);
  assert.match(repo, /apikey/);
  assert.doesNotMatch(repo, /rest\/v1\/(?:products|inventory|suppliers|inventory_movements)/);
});

test('storefront productivo conserva catálogo dinámico y detalle de variantes para WhatsApp', () => {
  const storefront = read('js/storefront.js');
  assert.match(storefront, /loadPublicProducts/);
  assert.match(storefront, /variantSummary/);
  assert.match(storefront, /Tallas\/presentaciones/);
  assert.match(storefront, /Colores\/tonos/);
});
