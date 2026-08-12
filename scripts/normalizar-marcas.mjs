import fs from 'node:fs';
import path from 'node:path';
import { BACKUP_DIR, INTERNAL_CATALOG_FILE, INTERNAL_HEADERS, canonicalBrand, recordsFromCsvFile, timestamp, toCsv } from './catalogo-utils.mjs';
if (!fs.existsSync(INTERNAL_CATALOG_FILE)) { console.error('❌ No existe data-private/catalogo_maestro_interno.csv.'); process.exit(1); }
const { headers, records } = recordsFromCsvFile(INTERNAL_CATALOG_FILE);
for (const required of INTERNAL_HEADERS) if (!headers.includes(required)) { console.error(`❌ Falta la columna interna obligatoria: ${required}`); process.exit(1); }
const changes=new Map();
for(const record of records){
  const before=record.Marca; const after=canonicalBrand(before);
  if(before!==after){ record.Marca=after; const key=`${before}|||${after}`; const cur=changes.get(key)||{before,after,count:0}; cur.count+=1; changes.set(key,cur); }
}
fs.mkdirSync(BACKUP_DIR,{recursive:true});
if(changes.size){
  fs.copyFileSync(INTERNAL_CATALOG_FILE,path.join(BACKUP_DIR,`catalogo-interno-pre-normalizacion-marcas-${timestamp()}.csv`));
  const rows=records.map(r=>INTERNAL_HEADERS.map(h=>r[h]??''));
  fs.writeFileSync(INTERNAL_CATALOG_FILE,toCsv([INTERNAL_HEADERS,...rows]),'utf8');
}
console.log(`Registros revisados: ${records.length}`);
if(!changes.size) console.log('✅ Marcas internas ya estaban normalizadas.');
else { console.log(`✅ Variantes de marca corregidas: ${changes.size}`); for(const c of changes.values()) console.log(`- ${c.before} → ${c.after}: ${c.count} producto${c.count===1?'':'s'}`); }
