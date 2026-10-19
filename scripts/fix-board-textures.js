import sharp from 'sharp';
import path from 'path';

const brainDir = 'C:/Users/haafi/.gemini/antigravity-ide/brain/153ea5d8-ce5b-4773-9381-228c9413e4da/';
const assetsDir = 'c:/Users/haafi/Desktop/Rollz-Website/src/assets/';

async function fixBoards() {
  const darkIn = path.join(brainDir, 'real_board_dark_1792167377488.jpg');
  const creamIn = path.join(brainDir, 'real_board_cream_1792167350520.jpg');

  // 1. Trim dark board (slate) so it goes edge to edge
  await sharp(darkIn)
    .trim()
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'board-dark.jpg'));
  console.log('✅ Dark board trimmed edge-to-edge');

  // 2. Trim cream board and slightly boost brightness so wood is clean & readable
  await sharp(creamIn)
    .trim()
    .modulate({
      brightness: 1.08,
      saturation: 0.95
    })
    .jpeg({ quality: 95 })
    .toFile(path.join(assetsDir, 'board-cream.jpg'));
  console.log('✅ Cream board trimmed and lightened for readability');
}

fixBoards().catch(console.error);
