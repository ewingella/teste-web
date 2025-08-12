const fs = require('fs');
const path = require('path');

const demosDir = path.join(__dirname, 'demos');
const files = fs.readdirSync(demosDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(demosDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix CSS and JS links
  content = content.replace(
    /<link rel="stylesheet" href="guide\.css" \/>/g,
    '<link rel="stylesheet" href="../guide.css" />'
  );
  content = content.replace(
    /<script src="guide\.js" defer><\/script>/g,
    '<script src="../guide.js" defer></script>'
  );
  
  // Fix navigation links
  content = content.replace(/href="index\.html"/g, 'href="../index.html"');
  content = content.replace(/href="demos\/([^"]+)"/g, 'href="$1"');
  
  // Fix back link
  content = content.replace(
    /<a class="back" href="index\.html">/g,
    '<a class="back" href="../index.html">'
  );
  
  // Fix button and div IDs - remove "demos-" prefix and ".html" suffix
  const baseName = file.replace('.html', '');
  content = content.replace(
    new RegExp(`data-target="demos-${file}-([^"]+)"`, 'g'),
    `data-target="${baseName}-$1"`
  );
  content = content.replace(
    new RegExp(`id="demos-${file}-([^"]+)"`, 'g'),
    `id="${baseName}-$1"`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${file}`);
});

console.log('All demo files have been fixed!');
