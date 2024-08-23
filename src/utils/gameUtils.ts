export type Grid = string[][];

const CONNECT = 4;

export function checkWin(grid: Grid, row: number, col: number): boolean {
  const currentPlayerColor = grid[row][col];
  if (!currentPlayerColor) return false

  const directions = [
    { row: 0, col: 1 },  // Horizontal
    { row: 1, col: 0 },  // Vertical
    { row: 1, col: 1 },  // Diagonal (top-left to bottom-right)
    { row: 1, col: -1 }, // Diagonal (bottom-left to top-right)
  ];

  for (let { row: rowDir, col: colDir } of directions) {
    let count = 1;

    count += countConsecutive(grid, row, col, rowDir, colDir, currentPlayerColor);

    count += countConsecutive(grid, row, col, -rowDir, -colDir, currentPlayerColor);

    if (count >= CONNECT) {
      return true;
    } 
  }

  return false;
}

function countConsecutive(
  grid: Grid,
  startRow: number,
  startCol: number,
  rowDir: number,
  colDir: number,
  playerColor: string
): number {
  let count = 0;
  let row = startRow + rowDir;
  let col = startCol + colDir;

  while (
    row >= 0 &&
    row < 6 &&
    col >= 0 &&
    col < 7 &&
    grid[row][col] === playerColor
  ) {
    count++;
    row += rowDir;
    col += colDir;
  }

  return count;
}