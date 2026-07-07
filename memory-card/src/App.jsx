import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_ROWS_COUNT = 4;

function App() {
  const getCellOwner = (row, col) => {
    return occupiedCells.get(`${row},${col}`);
  };

  const addItemToCell = (item, row, col) => {
    item.style.gridColumn = `${col} / ${col + 1}`;
    item.style.gridRow = `${row} / ${row + 1}`;
    setOccupiedCells((prev) => new Map(prev).set(`${row},${col}`, item));
  };

  const [gridItems, setGridItems] = useState(
    Array.from(Array(TOTAL_ROWS_COUNT), () =>
      Array(HALF_COLLS_COUNT * 2 + 1).fill(null), // adding extra coll for spacing
    ),
  );
  const [occupiedCells, setOccupiedCells] = useState(new Set());

  function addGridItem(row, col) {
    const seed = generateSeed(8);

    setGridItems((prev) => {
      const next = [...prev];
      next[row] = [...next[row]];
      next[row][col] = seed; 
      return next;
    });

    setOccupiedCells(prev => new Set(prev).add(`${row},${col}`));
  }

  function getFreeCells() {
    const freeCells = [];

    gridItems.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === null) {
          freeCells.push({ row: rowIdx, col: colIdx });
        }
      });
    });

    console.log(freeCells);
  }

  return (
    <>
      <div className="top">
        <div>
          <span>POINTS </span>
          <span className="score">X</span>
        </div>
        <div>
          <span>RECORD </span>
          <span className="record">Y</span>
        </div>
      </div>
      <div className="center">
        <div
          className="arrangement"
          style={{
            "--half-colls-count": HALF_COLLS_COUNT,
            "--total-rows-count": TOTAL_ROWS_COUNT,
          }}
        >
          {gridItems.map((gridRow, rowIdx) =>
            gridRow.map((seed, colIdx) => {
              if (seed) return null;
              return (
                <Person key={seed} seed={seed} row={rowIdx} col={colIdx} />
              );
            }),
          )}
        </div>
        <button onClick={() => addGridItem(1, 2)}>REDRUM</button>
        <button onClick={() => getFreeCells()}>FREE CELLS</button>
      </div>
      <div className="bottom">
        <div>
          <span>PAYMENT </span>
          <span className="progress">X | X</span>
        </div>
      </div>
    </>
  );
}

export default App;
