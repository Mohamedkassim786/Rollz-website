import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/haafi/.gemini/antigravity-ide/brain/153ea5d8-ce5b-4773-9381-228c9413e4da/';
const assetsDir = 'c:/Users/haafi/Desktop/Rollz-Website/src/assets/';

async function processRope() {
  const ropeInput = path.join(brainDir, 'real_hanging_rope_1792167322937.jpg');
  const ropeOutput = path.join(assetsDir, 'real-rope.png');

  const { data, info } = await sharp(ropeInput).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;

    // Detect pure white/light grey background
    if (r > 242 && g > 242 && b > 242) {
      out[i * 4 + 3] = 0; // transparent
    } else if (r > 230 && g > 230 && b > 230) {
      // Soft feather edge
      const factor = (242 - Math.max(r, g, b)) / 12;
      out[i * 4 + 3] = Math.round(factor * 255);
    } else {
      out[i * 4 + 3] = 255;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .toFile(ropeOutput);

  console.log('✅ Rope processed & trimmed:', ropeOutput);
}

async function copyBoards() {
  const creamInput = path.join(brainDir, 'real_board_cream_1792167350520.jpg');
  const darkInput = path.join(brainDir, 'real_board_dark_1792167377488.jpg');

  await sharp(creamInput).toFile(path.join(assetsDir, 'board-cream.jpg'));
  await sharp(darkInput).toFile(path.join(assetsDir, 'board-dark.jpg'));

  console.log('✅ Board textures saved to assets');
}

async function run() {
  await processRope();
  await copyBoards();
}

run().catch(console.error);
