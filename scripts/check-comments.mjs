import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync("git ls-files 'src/**/*.js' 'src/**/*.jsx' 'src/**/*.css' 'scripts/*.mjs'", {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const problems = [];
const flag = (file, line, why) => problems.push(`${file}:${line}  ${why}`);

const isJsx = (line) => line.trim().startsWith('{/*');
const allowsRunOn = (line) => line.includes('eslint-disable-next-line');

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const css = file.endsWith('.css');

  let blockStart = 0;
  let inBlock = false;
  let run = 0;

  lines.forEach((raw, i) => {
    const no = i + 1;
    const text = raw.trim();

    if (inBlock) {
      if (text.includes('*/')) {
        inBlock = false;
        if (no > blockStart)
          flag(file, blockStart, `block comment spans ${no - blockStart + 1} lines`);
      }
      return;
    }

    const opens = text.indexOf('/*');
    if (opens !== -1 && !text.slice(0, opens).includes('//')) {
      if (text.startsWith('/**')) flag(file, no, 'JSDoc block — use // instead');
      const closes = text.indexOf('*/', opens + 2);
      if (closes === -1) {
        inBlock = true;
        blockStart = no;
      }
      run = 0;
      return;
    }

    const isLineComment = css
      ? false
      : text.startsWith('//') || (isJsx(text) && text.endsWith('*/}'));

    if (isLineComment) {
      run += 1;
      if (run === 2 && !allowsRunOn(raw) && !allowsRunOn(lines[i - 1] ?? '')) {
        flag(file, no - 1, 'two comment lines in a row — cut it, do not reflow');
      }
    } else if (text !== '') {
      run = 0;
    }
  });
}

if (problems.length) {
  console.error(`comment-style: ${problems.length} violation(s)\n`);
  problems.forEach((p) => console.error('  ' + p));
  process.exit(1);
}
console.log(`comment-style: clean (${files.length} files)`);
