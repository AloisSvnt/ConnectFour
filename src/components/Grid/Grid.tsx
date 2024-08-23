import { useState, useCallback, useEffect } from "react";
import Case from "../Case/Case";
import Disc from "../Disc/Disc";
import { type Grid, checkWin } from "../../utils/gameUtils";

function Grid() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentIndexTop, setCurrentIndexTop] = useState(0);
  const [isDiscVisible, setIsDiscVisible] = useState(false);
  const [isDiscPlayed, setIsDiscPlayed] = useState(false);
  const [caseColors, setCaseColors] = useState<string[]>(
    Array(42).fill("bg-base-100")
  );
  const [player, setPlayer] = useState<number>(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const u1 = 16;
  const r = 144;
  const positionTopHover = "-128px";

  const cols: { [key: number]: number[] } = {
    1: [0, 7, 14, 21, 28, 35],
    2: [1, 8, 15, 22, 29, 36],
    3: [2, 9, 16, 23, 30, 37],
    4: [3, 10, 17, 24, 31, 38],
    5: [4, 11, 18, 25, 32, 39],
    6: [5, 12, 19, 26, 33, 40],
    7: [6, 13, 20, 27, 34, 41],
  };

  const getGridFromCaseColors = (colors: string[]): Grid => {
    const grid: Grid = [];
    for (let row = 0; row < 6; row++) {
      grid[row] = colors.slice(row * 7, row * 7 + 7);
    }
    return grid;
  };

  const addTokenTop = useCallback(
    (columnIndex: number) => {
      if (columnIndex < 1 || columnIndex > 7) return;
      const foundKey = Object.entries(cols).find(
        ([key]) => Number(key) === columnIndex
      );
      if (foundKey) {
        setCurrentIndexTop(columnIndex - 1);
        setIsDiscVisible(true);
      } else {
        setCurrentIndexTop(0);
        setIsDiscVisible(false);
      }
    },
    [cols]
  );

  const playedDiscToBottom = (columnIndex: number): number | null => {
    if (isOver) return null;
    if (columnIndex < 1 || columnIndex > 7) return null;

    const columnValues = cols[columnIndex];
    if (!columnValues) {
      console.error(`Column ${columnIndex} is not defined`);
      return null;
    }

    const availableRow = columnValues
      .reverse()
      .find((row) => caseColors[row] === "bg-base-100");

    if (availableRow !== undefined) {
      const newIndex = availableRow;
      setCaseColors((prevColors) => {
        const updatedColors = [...prevColors];
        updatedColors[newIndex] = player === 1 ? "bg-error" : "bg-warning";
        return updatedColors;
      });
      return newIndex;
    }
    return null;
  };

  const checkDraw = (grid: Grid): boolean => {
    return grid.every((row) => row.every((cell) => cell !== "bg-base-100"));
  };

  const addPlayedDisc = (columnIndex: number) => {
    const newIndex = playedDiscToBottom(columnIndex);
    if (newIndex !== null) {
      setCurrentIndex(newIndex);
      setIsDiscPlayed(true);
      setPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    }
  };

  useEffect(() => {
    if (currentIndex !== null) {
      const grid = getGridFromCaseColors(caseColors);
      const row = Math.floor(currentIndex / 7);
      const col = currentIndex % 7;

      if (checkWin(grid, row, col)) {
        setWinner(player === 1 ? "Yellow" : "Red");
        setIsOver(true);
        setIsModalVisible(true);
      } else if (checkDraw(grid)) {
        setWinner(null); // Aucun gagnant
        setIsOver(true);
        setIsModalVisible(true);
      }
    }
  }, [caseColors, currentIndex, player]);

  const handleMouseLeave = useCallback(() => {
    setIsDiscVisible(false);
  }, []);

  const resetGame = () => {
    setCaseColors(Array(42).fill("bg-base-100"));
    setWinner(null);
    setIsOver(false);
    setIsDiscPlayed(false);
    setPlayer(1);
    setCurrentIndex(null);
    setIsDiscVisible(false);
    setCurrentIndexTop(0);
    setIsModalVisible(false);
  };

  return (
    <div
      className="relative grid grid-rows-6 grid-cols-7 max-w-7xl aspect-[7/6] margin-auto"
      onMouseLeave={handleMouseLeave}
    >
      {Array(42)
        .fill(0)
        .map((_, index) => {
          const columnIndex = (index % 7) + 1;
          return (
            <Case
              key={index}
              onHover={() => addTokenTop(columnIndex)}
              DiscPlayed={isDiscPlayed}
              playerColor={caseColors[index]}
              onClick={() => addPlayedDisc(columnIndex)}
            />
          );
        })}
      {isDiscVisible && (
        <Disc
          playerColor={player === 1 ? "bg-error" : "bg-warning"}
          ClassPosition="absolute"
          positionTop={positionTopHover}
          positionLeft={`${u1 + r * (currentIndexTop ?? 0)}px`}
        />
      )}
      {isOver && isModalVisible && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-white text-4xl">
            {winner ? `Player ${winner} wins!` : "It's a draw!"}
            <button
              onClick={resetGame}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grid;
