const fs = require('fs');
const path = require('path');
const html = fs.readFileSync('C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website/admin.html', 'utf8');
const lines = html.split('\n');
console.log(lines.slice(lines.length - 30).join('\n'));
