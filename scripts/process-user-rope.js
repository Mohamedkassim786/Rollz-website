import sharp from 'sharp';
import path from 'path';

const input = 'C:/Users/haafi/.gemini/antigravity-ide/brain/153ea5d8-ce5b-4773-9381-228c9413e4da/.user_uploaded/media_1792168338556.png';
const output = 'c:/Users/haafi/Desktop/Rollz-Website/src/assets/real-rope.png';

async function processUserRope() {
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  console.log('Rope dimensions:', width, 'x', height, 'channels:', channels);

  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const a = channels === 4 ? data[i * channels + 3] : 255;

    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;

    // Check if background is transparent already or white
    if (a < 10) {
      out[i * 4 + 3] = 0;
    } else if (r > 240 && g > 240 && b > 240) {
      out[i * 4 + 3] = 0;
    } else if (r > 225 && g > 225 && b > 225) {
      const factor = (240 - Math.max(r, g, b)) / 15;
      out[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(factor * 255)));
    } else {
      out[i * 4 + 3] = a;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .toFile(output);

  console.log('✅ User rope processed & saved to:', output);
}

processUserRope().catch(console.error);
