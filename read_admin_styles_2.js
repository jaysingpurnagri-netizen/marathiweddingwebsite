const fs = require('fs');
const html = fs.readFileSync('C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website/admin.html', 'utf8');
const lines = html.split('\n');

console.log('--- Lines 1180-1230 of admin.html ---');
console.log(lines.slice(1180, 1230).join('\n'));
