import sharp from 'sharp';
import path from 'path';

const input = 'C:/Users/haafi/.gemini/antigravity-ide/brain/153ea5d8-ce5b-4773-9381-228c9413e4da/.user_uploaded/media_1792168177110.png';
const output = 'c:/Users/haafi/Desktop/Rollz-Website/src/assets/rustic-stick.png';

async function processStick() {
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;

    // Detect white/off-white background
    if (r > 242 && g > 242 && b > 242) {
      out[i * 4 + 3] = 0; // transparent
    } else if (r > 225 && g > 225 && b > 225) {
      const factor = (242 - Math.max(r, g, b)) / 17;
      out[i * 4 + 3] = Math.max(0, Math.min(255, Math.round(factor * 255)));
    } else {
      out[i * 4 + 3] = 255;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .toFile(output);

  console.log('✅ Stick processed and trimmed with transparent background:', output);
}

processStick().catch(console.error);
