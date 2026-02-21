#!/bin/bash
# Auto-lint hook: runs ESLint --fix after every Edit/Write tool use.
# Receives tool-use JSON on stdin; extracts the file path and lints if it's a JS file.

INPUT=$(cat)
FILE=$(echo "$INPUT" | node -e "
  const chunks = [];
  process.stdin.on('data', c => chunks.push(c));
  process.stdin.on('end', () => {
    try {
      const d = JSON.parse(Buffer.concat(chunks));
      console.log(d.file_path || d.path || '');
    } catch (e) {
      console.log('');
    }
  });
" 2>/dev/null <<< "$INPUT")

if [[ "$FILE" =~ \.(js|jsx|ts|tsx)$ ]] && [ -f "$FILE" ]; then
  npx eslint --fix "$FILE" 2>&1 || true
fi
