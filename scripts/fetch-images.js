/*
 * Script para descargar imágenes referenciadas en los frontmatter de los
 * archivos markdown de `src/content/blog`. Reemplaza la URL por la ruta
 * local en el mismo frontmatter.
 *
 * Uso:
 *   npm run fetch-images
 *
 * Requisitos: Node.js 18+ (fetch global disponible).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.resolve(__dirname, '../src/content/blog');
const outDir = path.resolve(__dirname, '../public/images');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error descargando ${url}: ${res.status}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
}

function sanitizeFilename(str) {
  return str.replace(/[^a-z0-9\.\-]/gi, '_').toLowerCase();
}

async function processFile(file) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  const match = content.match(/image:\s*["'](.+?)["']/);
  if (match) {
    const url = match[1];
    if (url.startsWith('http')) {
      const ext = path.extname(new URL(url).pathname) || '.jpg';
      const filename = sanitizeFilename(path.basename(new URL(url).pathname)) || `img${ext}`;
      const localPath = `/images/${filename}`;
      const dest = path.join(outDir, filename);
      console.log(`Descargando ${url} → ${dest}`);
      try {
        // algunos enlaces de Unsplash incluyen parámetros de tamaño que devuelven 404,
        // así que descartamos la query antes de descargar.
        const downloadUrl = url.split('?')[0];
        await downloadImage(downloadUrl, dest);
        content = content.replace(url, localPath);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Actualizado frontmatter en ${file}`);
      } catch (err) {
        console.error(`No se pudo descargar ${url}:`, err.message);
      }
    }
  }
}

async function main() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    await processFile(file);
  }
  console.log('Proceso completado.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
