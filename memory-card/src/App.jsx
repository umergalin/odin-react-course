import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_ROWS_COUNT = 4;

function App() {
  const [gridItems, setGridItems] = useState(
    Array.from(Array(TOTAL_ROWS_COUNT), () =>
      Array(HALF_COLLS_COUNT * 2 + 1).fill(null), // adding extra coll for spacing
    ),
  );

  function addGridItem(rowIdx, colIdx) {
    const seed = generateSeed(8);

    setGridItems((prev) => {
      const next = [...prev];
      next[rowIdx] = [...next[rowIdx]];
      next[rowIdx][colIdx] = { seed }; 
      return next;
    });
  }

  function addRandomPerson() {
    const freeCells = getFreeCells();
    if (freeCells.length === 0) {
      console.log("can't add person: no more space in grid");
      return;
    }
    console.log(freeCells);
    const cell = freeCells[Math.floor(Math.random() * freeCells.length)];
    addGridItem(cell.row, cell.col); 
  }

  function removePerson(rowIdx, colIdx) {
    setGridItems((prev) => {
      const next = [...prev];
      next[rowIdx] = [...next[rowIdx]];
      next[rowIdx][colIdx] = null; 
      return next;
    });
  }

  function getFreeCells() {
    const freeCells = [];

    gridItems.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell === null && colIdx !== HALF_COLLS_COUNT) {
          freeCells.push({ row: rowIdx, col: colIdx });
        }
      });
    });

    return freeCells;
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
            gridRow.map((item, colIdx) => {
              return (
                item && (
                  <Person
                    key={item.seed}
                    seed={item.seed}
                    row={rowIdx}
                    col={colIdx}
                    clickHandle={() => removePerson(rowIdx, colIdx)}
                  />
                )
              );
            }),
          )}
        </div>
        <button onClick={() => addRandomPerson()}>REDRUM</button>
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
