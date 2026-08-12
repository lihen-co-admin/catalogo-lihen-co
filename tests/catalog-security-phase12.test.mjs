import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('configuración pública usa publishable key y no secret/service_role', () => {
  const env = read('js/config/env.example.js');
  const cfg = read('js/config/supabase.js');
  assert.match(env, /SUPABASE_PUBLISHABLE_KEY/);
  assert.match(env, /sb_publishable_/);
  assert.match(cfg, /SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(env, /sb_secret_[A-Za-z0-9_-]+/);
  assert.doesNotMatch(env, /service_role\s*[:=]\s*['"][A-Za-z0-9._-]+/i);
});

test('se conserva compatibilidad temporal con nombre legacy anon', () => {
  const cfg = read('js/config/supabase.js');
  assert.match(cfg, /SUPABASE_ANON_KEY/);
  assert.match(cfg, /publishableKey/);
});

test('catalog service permite controlar fallback ante error', () => {
  const env = read('js/config/env.js');
  const service = read('js/services/catalogService.js');
  assert.match(env, /CATALOG_FALLBACK_ON_ERROR/);
  assert.match(service, /fallbackOnError/);
});

test('catalog repository consulta exclusivamente catalog_public', () => {
  const repo = read('js/repositories/catalogRepository.js');
  assert.match(repo, /rest\/v1\/catalog_public/);
  assert.doesNotMatch(repo, /rest\/v1\/(?:products|inventory|suppliers|inventory_movements)/);
});
