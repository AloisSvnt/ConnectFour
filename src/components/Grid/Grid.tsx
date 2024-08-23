import { useState, useCallback } from "react";
import Case from "../Case/Case";
import Disc from "../Disc/Disc";

function Grid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDiscVisible, setIsDiscVisible] = useState(false);
  const u1 = 16;
  const r = 144;
  const positionTopHover = "-128px";

  const cols = {
    1: [0, 7, 14, 21, 28, 35],
    2: [1, 8, 15, 22, 29, 36],
    3: [2, 9, 16, 23, 30, 37],
    4: [3, 10, 17, 24, 31, 38],
    5: [4, 11, 18, 25, 32, 39],
    6: [5, 12, 19, 26, 33, 40],
    7: [6, 13, 20, 27, 34, 41],
  };

  const addTokenTop = useCallback(
    (index: number) => {
      const foundKey = Object.entries(cols).find(([key, value]) => {
        return value.includes(index); // Retourne le résultat de includes pour arrêter la recherche
      });
      if (foundKey) {
        setTimeout(() => {
          setCurrentIndex(Number(foundKey[0]) - 1);
          setIsDiscVisible(true);
        }, 0);
      } else {
        setCurrentIndex(-1);
        setIsDiscVisible(false);
      }
    },
    [cols]
  );

  const handleMouseLeave = useCallback(() => {
    setIsDiscVisible(false);
  }, []);

  return (
    <div
      className="relative grid grid-rows-6 grid-cols-7 max-w-7xl aspect-[7/6] margin-auto"
      onMouseLeave={handleMouseLeave}
    >
      {Array(42)
        .fill(0)
        .map((_, index) => (
          <Case key={index} id={index} onHover={() => addTokenTop(index)} />
        ))}
      {isDiscVisible && (
        <Disc
          ClassPosition="absolute"
          positionTop={positionTopHover}
          positionLeft={`${u1 + r * currentIndex}px`}
        />
      )}
    </div>
  );
}

export default Grid;
