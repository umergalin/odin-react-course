import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_ROWS_COUNT = 4;

const DIFFICULTY_SETTINGS = {
  basePeopleCount: 1,
  scalingFactor: 1.2,
  formula: (round) => basePeopleCount * scalingFactor * Math.sqrt(round),
  maxPeople: HALF_COLLS_COUNT * 2 * TOTAL_ROWS_COUNT,
};

const INITIAL_GAME_STATE = {
  isPlaying: false,
  score: 0,
  round: 1,
};

function App() {
  const [scoreRecord, setScoreRecord] = useState(0);
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);

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

  function getTargetPersonCount() {

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

  function handleGameStart() {
    setGameState({ ...INITIAL_GAME_STATE, isPlaying: true });
  }

  return (
    <>
      <div className="top">
        {isPlaying && (
          <div>
            <span>POINTS </span>
            <span className="score">{score}</span>
          </div>
        )}
        <div>
          <span>RECORD </span>
          <span className="record">{scoreRecord}</span>
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
        {!isPlaying && <button onClick={handleGameStart}>PLAY</button>}
        {isPlaying && (
          <div>
            <span>PAYMENT </span>
            <span className="progress">X | X</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
