import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import * as espree from 'espree';

const SCRIPT_GLOBS = ["'src/**/*.js'", "'src/**/*.jsx'", "'scripts/*.mjs'"];
const STYLE_GLOBS = ["'src/**/*.css'"];

const tracked = (globs) =>
  execSync(`git ls-files ${globs.join(' ')}`, { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

// lint-staged appends the staged paths; with none, sweep everything tracked.
const argued = process.argv.slice(2);
const scripts = argued.length
  ? argued.filter((f) => /\.(js|jsx|mjs)$/.test(f))
  : tracked(SCRIPT_GLOBS);
const styles = argued.length ? argued.filter((f) => f.endsWith('.css')) : tracked(STYLE_GLOBS);

const problems = [];
const flag = (file, line, why) => problems.push(`${file}:${line}  ${why}`);

const exempt = (line = '') => line.includes('eslint-disable-next-line');

// Textual scanning cannot tell a comment from the string '/*', so comments come from the parser.
function checkScript(file) {
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');

  let parsed;
  try {
    parsed = espree.parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      comment: true,
      loc: true,
      ecmaFeatures: { jsx: true },
    });
  } catch (error) {
    flag(file, error.lineNumber ?? 1, `could not parse: ${error.message}`);
    return;
  }

  let previousLine = -2;

  for (const comment of parsed.comments) {
    const { line: start } = comment.loc.start;
    const { line: end } = comment.loc.end;

    if (comment.type === 'Block') {
      if (comment.value.startsWith('*')) flag(file, start, 'JSDoc block — use // instead');
      if (end > start) flag(file, start, `block comment spans ${end - start + 1} lines`);
      continue;
    }

    // Only leading comments can be a wrapped narration; a trailing one has code before it.
    if (lines[start - 1].slice(0, comment.loc.start.column).trim() !== '') continue;

    const runsOn = start === previousLine + 1;
    if (runsOn && !exempt(lines[start - 1]) && !exempt(lines[previousLine - 1])) {
      flag(file, previousLine, 'two comment lines in a row — cut it, do not reflow');
    }
    previousLine = start;
  }
}

function checkStyle(file) {
  const lines = readFileSync(file, 'utf8').split('\n');
  let start = 0;
  let open = false;
  let previous = -2;

  lines.forEach((raw, i) => {
    const no = i + 1;
    const text = raw.trim();

    if (open) {
      if (text.includes('*/')) {
        open = false;
        flag(file, start, `block comment spans ${no - start + 1} lines`);
      }
      return;
    }

    if (!text.startsWith('/*')) return;

    if (text.includes('*/')) {
      if (no === previous + 1)
        flag(file, previous, 'two comment lines in a row — cut it, do not reflow');
      previous = no;
      return;
    }

    open = true;
    start = no;
  });
}

scripts.forEach(checkScript);
styles.forEach(checkStyle);

const scanned = scripts.length + styles.length;

if (problems.length) {
  console.error(`comment-style: ${problems.length} violation(s)\n`);
  problems.forEach((p) => console.error('  ' + p));
  process.exit(1);
}
console.log(`comment-style: clean (${scanned} files: .js .jsx .mjs .css)`);
