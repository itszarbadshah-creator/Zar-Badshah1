import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { ZipArchive } = require('archiver');

const __dirname = path.resolve();
const outputDir = path.join(__dirname, 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'Zarbadshah_Full_Project.zip');
const output = fs.createWriteStream(outputPath);
const archive = new ZipArchive({
  zlib: { level: 9 }
});

output.on('close', function() {
  console.log('Zip file created successfully. Total size: ' + (archive.pointer() / 1024 / 1024).toFixed(2) + ' MB');
});

archive.on('error', function(err) {
  console.error('Error creating zip:', err);
  process.exit(1);
});

archive.pipe(output);

// Glob files and directories from root
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'public/Zarbadshah_Full_Project.zip',
    'public/Zarbadshah_Full_Project.tar.gz',
    'package-lock.json'
  ],
  dot: true
});

archive.finalize();
