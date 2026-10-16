import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processWhiteBackground(inputPath, outputPath, tolerance = 18, feather = 2) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance;
  }

  // Seed borders
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) queue.push(x, 0);
    if (isWhite(x, height - 1)) queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    if (isWhite(0, y)) queue.push(0, y);
    if (isWhite(width - 1, y)) queue.push(width - 1, y);
  }

  for (let i = 0; i < queue.length; i += 2) {
    visited[queue[i + 1] * width + queue[i]] = 1;
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && isWhite(nx, ny)) {
          visited[nidx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const oidx = idx * 4;
      const iidx = idx * channels;

      const r = data[iidx];
      const g = data[iidx + 1];
      const b = data[iidx + 2];

      out[oidx] = r;
      out[oidx + 1] = g;
      out[oidx + 2] = b;

      if (visited[idx]) {
        out[oidx + 3] = 0;
      } else {
        let hasBgNeighbor = false;
        let bgCount = 0;
        for (let dy = -feather; dy <= feather; dy++) {
          for (let dx = -feather; dx <= feather; dx++) {
            const sx = x + dx;
            const sy = y + dy;
            if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
              if (visited[sy * width + sx]) {
                hasBgNeighbor = true;
                bgCount++;
              }
            }
          }
        }

        if (hasBgNeighbor) {
          const totalKernel = (feather * 2 + 1) * (feather * 2 + 1);
          const factor = 1 - (bgCount / totalKernel);
          const whiteness = Math.min(r, g, b);
          const colorStrength = (255 - whiteness) / 255;
          out[oidx + 3] = Math.round(255 * factor * Math.max(0.4, colorStrength));
        } else {
          out[oidx + 3] = 255;
        }
      }
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile(outputPath);
  console.log(`Saved transparent image: ${outputPath}`);
}

async function main() {
  const dishes = ['fries', 'bbq', 'roll', 'kebab'];
  for (const dish of dishes) {
    const input = path.resolve(`./public/images/showcase-${dish}.jpg`);
    const output = path.resolve(`./src/assets/showcase-${dish}.png`);
    await processWhiteBackground(input, output, 18, 2);
  }
  console.log('All 4 showcase dishes processed!');
}

main().catch(console.error);
