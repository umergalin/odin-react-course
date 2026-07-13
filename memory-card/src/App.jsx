import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_ROWS_COUNT = 4;

const DIFFICULTY_SETTINGS = {
  basePeopleCount: 2,
  scalingFactor: 3.5,
  peopleCountFormula: (round) => Math.round(basePeopleCount * Math.sqrt(scalingFactor * round)),
  alightingFormula: (peopleCount) => peopleCount * 0.5,
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
  const [showOverlay, setShowOverlay] = useState(false);

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
        {gameState.isPlaying && (
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
                    clickHandle={removePerson}
                  />
                )
              );
            }),
          )}
        </div>
        <div className={`overlay ${showOverlay ? "show" : ""}`}></div>
        <div></div>
        <button onClick={() => addRandomPerson()}>REDRUM</button>
      </div>
      <div className="bottom">
        {!gameState.isPlaying && (
          <button onClick={handleGameStart}>PLAY</button>
        )}
        {gameState.isPlaying && (
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