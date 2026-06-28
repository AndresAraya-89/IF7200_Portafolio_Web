// Genera src/data/materiales.js escaneando public/materiales/.
// Uso: npm run manifest   (o: node scripts/gen-manifest.mjs)
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, basename, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const root = join(projectRoot, 'public', 'materiales')
const slugs = ['markov', 'control-estadistico', 'simulacion', 'redes', 'transporte', 'programacion']

function walk(dir) {
  let out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out = out.concat(walk(full))
    else out.push(full)
  }
  return out
}

// Ruta absoluta -> URL pública con encoding (/materiales/...)
function toUrl(full) {
  const rel = relative(root, full).split('\\').join('/')
  return '/materiales/' + rel.split('/').map(encodeURIComponent).join('/')
}

const nice = (f) => basename(f, extname(f))

const manifest = {}
for (const slug of slugs) {
  const files = walk(join(root, slug))
  const pdfs = files
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .map((f) => ({ nombre: nice(f), archivo: toUrl(f) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  const formulas = files
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .map((f) => ({ nombre: nice(f), archivo: toUrl(f) }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  manifest[slug] = { pdfs, formulas }
}

const header = `// ARCHIVO GENERADO AUTOMÁTICAMENTE — no editar a mano.
// Manifiesto del material de cada tema (PDFs e imágenes de fórmulas) que vive
// dentro de public/materiales/ y por tanto se despliega junto al sitio.
// Regenerar con: npm run manifest
`
const body = `export const materiales = ${JSON.stringify(manifest, null, 2)}\n`
writeFileSync(join(projectRoot, 'src', 'data', 'materiales.js'), header + '\n' + body)
console.log('Manifiesto generado.')
for (const s of slugs) console.log(`  ${s}: ${manifest[s].pdfs.length} PDF, ${manifest[s].formulas.length} fórmulas`)
