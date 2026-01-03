import { ROWS, COLS } from "./index.js";

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let liveNeighbors = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // 自分自身はカウントしない
          const newRow = row + i;
          const newCol = col + j;

          // 有効な範囲内のセルか確認
          if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
            if (grid[newRow][newCol]) {
              liveNeighbors++;
            }
          }
        }
      }

      if (grid[row][col]) {
        // 生存しているセル
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = false; // 過疎または過密で死ぬ
        }
      } else {
        // 死んでいるセル
        if (liveNeighbors === 3) {
          nextGrid[row][col] = true; // 誕生する
        }
      }
    }
  }
  return nextGrid;
}