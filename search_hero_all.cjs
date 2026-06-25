const fs = require('fs');

const tempPath = 'C:\\Users\\Sil\\.gemini\\antigravity\\scratch\\ellen-bruist-mee\\transcript_temp.jsonl';

const data = fs.readFileSync(tempPath, 'utf8');
const lines = data.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const step = JSON.parse(line);
    if (JSON.stringify(step).includes('id=\\"hero\\"')) {
      console.log(`Step ${step.step_index} (${step.source}/${step.type}) contains id="hero"`);
      // Scan tool calls or contents for snippets containing id="hero"
      const text = JSON.stringify(step);
      let startIdx = 0;
      while (true) {
        const idx = text.indexOf('id=\\"hero\\"', startIdx);
        if (idx === -1) break;
        console.log('--- MATCH ---');
        console.log(text.substring(idx - 150, idx + 800));
        startIdx = idx + 1;
      }
    }
  } catch (err) {}
}
