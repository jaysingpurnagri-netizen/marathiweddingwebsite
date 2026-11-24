const fs = require('fs');
const targetDir = 'C:/Users/Aspire 3/.gemini/antigravity/scratch/marathi-wedding-website';
const indexHtml = fs.readFileSync(targetDir + '/index.html', 'utf8');
const scriptJs = fs.readFileSync(targetDir + '/script.js', 'utf8');
const cultJs = fs.readFileSync(targetDir + '/indian_culture_engine.js', 'utf8');
const langJs = fs.readFileSync(targetDir + '/language_engine.js', 'utf8');

function findMissing(sourceJs, targetHtml, label) {
    const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
    let match;
    const missing = new Set();
    while ((match = regex.exec(sourceJs)) !== null) {
        const id = match[1];
        if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`id='${id}'`)) {
            missing.add(id);
        }
    }
    console.log(`Missing IDs in ${label}:`, Array.from(missing));
}

findMissing(scriptJs, indexHtml, 'script.js -> index.html');
findMissing(cultJs, indexHtml, 'indian_culture_engine.js -> index.html');
findMissing(langJs, indexHtml, 'language_engine.js -> index.html');
