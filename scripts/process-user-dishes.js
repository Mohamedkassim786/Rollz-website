import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const userDir = 'C:/Users/haafi/.gemini/antigravity-ide/brain/153ea5d8-ce5b-4773-9381-228c9413e4da/.user_uploaded/';

// 1. Process black background (Loaded Fries and BBQ)
async function processBlackBg(inputPath, outputPath, blackThreshold = 22, feather = 2) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBlack(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r <= blackThreshold && g <= blackThreshold && b <= blackThreshold;
  }

  // Seed borders
  for (let x = 0; x < width; x++) {
    if (isBlack(x, 0)) queue.push(x, 0);
    if (isBlack(x, height - 1)) queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    if (isBlack(0, y)) queue.push(0, y);
    if (isBlack(width - 1, y)) queue.push(width - 1, y);
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
        if (!visited[nidx] && isBlack(nx, ny)) {
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
        // Feather near background
        let bgNeighbors = 0;
        for (let dy = -feather; dy <= feather; dy++) {
          for (let dx = -feather; dx <= feather; dx++) {
            const sx = x + dx;
            const sy = y + dy;
            if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
              if (visited[sy * width + sx]) bgNeighbors++;
            }
          }
        }

        if (bgNeighbors > 0) {
          const total = (feather * 2 + 1) * (feather * 2 + 1);
          const factor = 1 - (bgNeighbors / total);
          const brightness = Math.max(r, g, b) / 255;
          out[oidx + 3] = Math.round(255 * factor * Math.max(0.3, brightness));
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
  console.log(`Saved transparent black-bg cut to ${outputPath}`);
}

// 2. Process checkerboard pattern (Kebab)
async function processCheckerboardBg(inputPath, outputPath, feather = 2) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const visited = new Uint8Array(width * height);
  const queue = [];

  function isChecker(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Gray or white squares: low saturation, relatively bright
    const diff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return diff <= 6 && r >= 165;
  }

  // Seed borders
  for (let x = 0; x < width; x++) {
    if (isChecker(x, 0)) queue.push(x, 0);
    if (isChecker(x, height - 1)) queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    if (isChecker(0, y)) queue.push(0, y);
    if (isChecker(width - 1, y)) queue.push(width - 1, y);
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
        if (!visited[nidx] && isChecker(nx, ny)) {
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
        let bgNeighbors = 0;
        for (let dy = -feather; dy <= feather; dy++) {
          for (let dx = -feather; dx <= feather; dx++) {
            const sx = x + dx;
            const sy = y + dy;
            if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
              if (visited[sy * width + sx]) bgNeighbors++;
            }
          }
        }

        if (bgNeighbors > 0) {
          const total = (feather * 2 + 1) * (feather * 2 + 1);
          const factor = 1 - (bgNeighbors / total);
          out[oidx + 3] = Math.round(255 * factor);
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
  console.log(`Saved transparent checkerboard cut to ${outputPath}`);
}

async function main() {
  // 1. Loaded Fries
  await processBlackBg(
    path.join(userDir, 'media_1792059333380.jpg'),
    path.resolve('./src/assets/showcase-fries.png'),
    25,
    2
  );

  // 2. Roll (Already transparent PNG, just trim)
  await sharp(path.join(userDir, 'media_1792059490872.png'))
    .trim()
    .png()
    .toFile(path.resolve('./src/assets/showcase-roll.png'));
  console.log('Saved trimmed roll to src/assets/showcase-roll.png');

  // 3. BBQ
  await processBlackBg(
    path.join(userDir, 'media_1792059545702.jpg'),
    path.resolve('./src/assets/showcase-bbq.png'),
    25,
    2
  );

  // 4. Kebab
  await processCheckerboardBg(
    path.join(userDir, 'media_1792059580468.jpg'),
    path.resolve('./src/assets/showcase-kebab.png'),
    2
  );

  console.log('All 4 user-provided dishes processed successfully!');
}

main().catch(console.error);
