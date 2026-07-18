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

  const [persons, setPersons] = useState([]);

  const [gridItems, setGridItems] = useState(
    Array.from(Array(TOTAL_ROWS_COUNT), () =>
      Array(HALF_COLLS_COUNT * 2 + 1).fill(null), // adding extra coll for spacing
    ),
  );

  function addPersonToGrid(rowIdx, colIdx) {
    setGridItems((prev) => {
      const next = [...prev];
      next[rowIdx] = [...next[rowIdx]];
      next[rowIdx][colIdx] = true; 
      return next;
    });
  }

  function createRandomPerson() {
    const freeCells = getFreeCells();
    if (freeCells.length === 0) {
      console.log("can't add person: no more space in grid");
      return;
    }

    const [row, col] = freeCells[Math.floor(Math.random() * freeCells.length)];
    const newPerson = { seed: generateSeed(8), row: row, col: col };

    setPersons((prev) => [...prev, newPerson]);

    addPersonToGrid(newPerson.row, newPerson.col); 
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
          freeCells.push([rowIdx, colIdx]);
        }
      });
    });

    return freeCells;
  }

  function generatePersonChunk() {
    setShowOverlay(true);
  }

  function startNewRound() {
    generatePersonChunk();
  }

  function handleGameStart() {
    startNewRound();
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
          {persons.map(({ seed, row, col }) => (
            <Person
              key={seed}
              seed={seed}
              row={row}
              col={col}
              clickHandle={removePerson}
            />
          ))}
        </div>

        <div></div>
        <button onClick={() => createRandomPerson()}>REDRUM</button>
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
      <div className={`overlay ${showOverlay ? "show" : ""}`}>
        <div className="new-persons-list"></div>
      </div>
    </>
  );
}

export default App;