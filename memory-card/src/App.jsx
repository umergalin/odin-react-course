import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";
import OverlayContainer from "./OverlayContainer.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_COLLS_COUNT = HALF_COLLS_COUNT * 2 + 1;
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

  const [persons, setPersons] = useState([]);
  const [newPersonsCount, setNewPersonsCount] = useState({ total: 0, paid: 0 });

  function getFreeCells() {
    const occupied = Array(TOTAL_ROWS_COUNT * TOTAL_COLLS_COUNT).fill(false);

    persons.forEach((person) => {
      occupied[person.row * TOTAL_COLLS_COUNT + person.col] = true;
    });

    const freeCells = [];

    for (let row = 0; row < TOTAL_ROWS_COUNT; row++) {
      for (let col = 0; col < TOTAL_COLLS_COUNT; col++) {
        if (col === HALF_COLLS_COUNT) continue; // skip center column

        if (!occupied[row * TOTAL_COLLS_COUNT + col]) {
          freeCells.push([row, col]);
        }
      }
    }

    return freeCells;
  }

  function createPersonChunk(count) {
    const freeCells = getFreeCells();
    const newPersons = [];

    for (let i = 0; i < count && freeCells.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * freeCells.length);
      const [row, col] = freeCells.splice(randomIndex, 1)[0];
      newPersons.push({ seed: generateSeed(8), row: row, col: col, hasPaid: false });
    }

    setPersons((prev) => [...prev, ...newPersons]);
    setNewPersonsCount({total: count, paid: 0});
  }

  function removePerson(row, col) {
    setPersons((prev) =>
      prev.filter((person) => person.row !== row || person.col !== col),
    );
  }

  function startNewRound() {
    createPersonChunk(3); // generating 3 only for tests (change to change to func later)
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
            <span className="progress">{newPersonsCount.paid} | {newPersonsCount.total}</span>
          </div>
        )}
      </div>
      <OverlayContainer newPersonsCount={newPersonsCount.total} persons={persons} />
    </>
  );
}

export default App;