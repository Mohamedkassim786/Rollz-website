import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Function to process red brush strokes:
// Since background is pure white and brush is red (#F20D18 or similar shades):
// alpha is proportional to how far green/blue is from 255
async function processRedBrush(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    // Background is near white (e.g. r>240, g>240, b>240)
    // Red stroke has low green and blue
    // Alpha is highest where g and b are lowest
    const whiteness = Math.min(r, g, b);
    let alpha = 255 - whiteness;
    if (whiteness > 248) {
      alpha = 0;
    } else if (whiteness > 220) {
      // smooth falloff
      alpha = Math.round((248 - whiteness) / 28 * alpha);
    }

    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = Math.min(255, Math.max(0, Math.round(alpha * 1.1)));
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);
  console.log(`Saved transparent brush to ${outputPath}`);
}

// Function to process isolated items on pure white background with border flood-fill
async function processWhiteBackground(inputPath, outputPath, tolerance = 18, feather = 2) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  // Create mask: 0 = background, 1 = foreground
  const mask = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Helper to check if pixel is near white
  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance;
  }

  // Seed with all borders
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) queue.push(x, 0);
    if (isWhite(x, height - 1)) queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    if (isWhite(0, y)) queue.push(0, y);
    if (isWhite(width - 1, y)) queue.push(width - 1, y);
  }

  for (let i = 0; i < queue.length; i += 2) {
    const x = queue[i];
    const y = queue[i + 1];
    visited[y * width + x] = 1;
  }

  // BFS
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

  // Build output with alpha
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
        // Check distance to background for edge feathering
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
          // calculate color difference from white
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
    .png()
    .toFile(outputPath);
  console.log(`Saved transparent image to ${outputPath}`);
}

async function main() {
  const imgDir = path.resolve('./public/images');
  
  await processRedBrush(path.join(imgDir, 'brush-swoosh.jpg'), path.join(imgDir, 'brush-swoosh.png'));
  await processRedBrush(path.join(imgDir, 'brush-underline.jpg'), path.join(imgDir, 'brush-underline.png'));
  
  await processWhiteBackground(path.join(imgDir, 'lettuce.jpg'), path.join(imgDir, 'lettuce.png'), 20, 2);
  await processWhiteBackground(path.join(imgDir, 'tomato.jpg'), path.join(imgDir, 'tomato.png'), 20, 2);
  await processWhiteBackground(path.join(imgDir, 'onion.jpg'), path.join(imgDir, 'onion.png'), 20, 2);
  await processWhiteBackground(path.join(imgDir, 'chili.jpg'), path.join(imgDir, 'chili.png'), 20, 2);
  await processWhiteBackground(path.join(imgDir, 'hero-chicken-roll.jpg'), path.join(imgDir, 'hero-chicken-roll.png'), 15, 2);
  
  console.log('All transparent PNGs processed!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
