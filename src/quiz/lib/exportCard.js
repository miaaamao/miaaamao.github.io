import { dimensionList } from '../data/dimensions';
import { TOTAL_POINTS } from '../data/questions';

const W = 1200;
const H = 675;
const SCALE = 2;
const MARGIN = 88;

const CANVAS_BG = '#f1f1f1';
const INK = '#0a0a0a';
const MUTED = '#9f9f9f';

const CAT = 190;
const BAR_W = 360;
const BAR_GAP = 54;

function wrap(ctx, text, x, y, maxWidth, lineHeight) {
  let line = '';
  let cursor = y;

  text.split(' ').forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, cursor);
      cursor += lineHeight;
      line = word;
    } else {
      line = next;
    }
  });

  if (line) ctx.fillText(line, x, cursor);
  return cursor;
}

export async function renderCard({ totals, title, subtitle, blurb, lunaCanvas }) {
  const canvas = document.createElement('canvas');
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;

  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);

  ctx.fillStyle = CANVAS_BG;
  ctx.fillRect(0, 0, W, H);

  // fillText does not wait for webfonts, so the first card can land in a fallback face.
  try {
    await document.fonts.ready;
  } catch {
    // No font loading API; carry on with whatever face resolves.
  }

  ctx.fillStyle = MUTED;
  ctx.font = '400 15px Geist, system-ui, sans-serif';
  ctx.fillText('WHAT’S YOUR SOCIAL MEDIA STYLE?'.split('').join(' '), MARGIN, MARGIN);

  ctx.fillStyle = INK;
  ctx.font = '500 52px Geist, system-ui, sans-serif';
  ctx.fillText(title, MARGIN, MARGIN + 74);

  let y = MARGIN + 112;

  if (subtitle) {
    ctx.fillStyle = MUTED;
    ctx.font = '400 21px Geist, system-ui, sans-serif';
    ctx.fillText(subtitle, MARGIN, y);
    y += 44;
  }

  if (blurb) {
    ctx.fillStyle = INK;
    ctx.font = '400 22px Geist, system-ui, sans-serif';
    y = wrap(ctx, blurb, MARGIN, y, W - MARGIN * 2 - CAT - 40, 34) + 64;
  }

  const peak = Math.max(...Object.values(totals), 1);

  dimensionList.forEach((dim, i) => {
    const value = totals[dim.key] ?? 0;
    const rowY = y + i * BAR_GAP;

    ctx.fillStyle = INK;
    ctx.font = '400 18px Geist, system-ui, sans-serif';
    ctx.fillText(dim.name, MARGIN, rowY);

    ctx.fillStyle = MUTED;
    ctx.font = '400 15px Geist, system-ui, sans-serif';
    const label = `${value} / ${TOTAL_POINTS}`;
    ctx.fillText(label, MARGIN + BAR_W - ctx.measureText(label).width, rowY);

    ctx.fillStyle = 'rgba(10,10,10,0.10)';
    ctx.fillRect(MARGIN, rowY + 12, BAR_W, 3);

    ctx.fillStyle = dim.color;
    ctx.fillRect(MARGIN, rowY + 12, BAR_W * (value / peak), 3);
  });

  if (lunaCanvas?.width) {
    // `mix-blend-mode` is CSS compositing and does not survive drawImage.
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(lunaCanvas, W - MARGIN - CAT, H - 150 - CAT, CAT, CAT);
    ctx.restore();
  }

  const footY = H - 78;
  ctx.strokeStyle = 'rgba(10,10,10,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(MARGIN, footY);
  ctx.lineTo(W - MARGIN, footY);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = '400 14px Geist, system-ui, sans-serif';
  ctx.fillText('A self-reflection tool, not a diagnostic assessment.', MARGIN, footY + 26);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

export function downloadBlob(blob, filename) {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
