const fs = require('fs');

const tempPath = 'C:\\Users\\Sil\\.gemini\\antigravity\\scratch\\ellen-bruist-mee\\transcript_temp.jsonl';

const data = fs.readFileSync(tempPath, 'utf8');
const lines = data.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const step = JSON.parse(line);
    if (step.step_index === 106) {
      console.log('Step 106 keys:', Object.keys(step));
      if (step.tool_calls) {
        step.tool_calls.forEach(tc => {
          console.log('Tool call:', tc.name);
          if (tc.args.CodeContent) {
            console.log('CodeContent length:', tc.args.CodeContent.length);
            // check if truncated
            if (tc.args.CodeContent.includes('truncated')) {
              console.log('Truncation detected in CodeContent!');
            }
          }
        });
      }
    }
  } catch (err) {}
}
