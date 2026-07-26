import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";
import OverlayContainer from "./OverlayContainer.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_COLLS_COUNT = HALF_COLLS_COUNT * 2 + 1;
const TOTAL_ROWS_COUNT = 4;

const DIFFICULTY_GROWTH_RATE = 1;
function getNewPeopleCount(round) {
  return Math.round(Math.sqrt(round * DIFFICULTY_GROWTH_RATE));
}

function App() {
  const [scoreRecord, setScoreRecord] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [score, setScore] = useState(0);

  const [persons, setPersons] = useState([]);
  const newPersonsCount = getNewPeopleCount(roundCount);
  const unpaidPersonsCount = persons.filter((p) => !p.hasPaid).length;

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
      newPersons.push({
        seed: generateSeed(8),
        row: row,
        col: col,
        hasPaid: false,
      });
    }

    setPersons((prev) => [...prev, ...newPersons]);
  }

  function removePerson(row, col) {
    setPersons((prev) =>
      prev.filter((person) => person.row !== row || person.col !== col),
    );
  }

  function handlePersonClick(targetSeed) {
    const target = persons.find((p) => p.seed === targetSeed);
    if (!target || target.hasPaid) return;

    setPersons((prev) =>
      prev.map((person) =>
        person.seed === targetSeed ? { ...person, hasPaid: true } : person,
      ),
    );

    if (unpaidPersonsCount === 1) startNewRound();
  }

  function startNewRound() {
    const nextRound = roundCount + 1;
    setRoundCount(nextRound);
    
    const nextNewPersonsCount = getNewPeopleCount(nextRound);
    createPersonChunk(nextNewPersonsCount);
  }

  function handleGameStart() {
    setIsPlaying(true);
    setRoundCount(0);
    startNewRound();
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
          {persons.map(({ seed, row, col }) => (
            <Person
              key={seed}
              seed={seed}
              row={row}
              col={col}
              clickHandle={handlePersonClick}
            />
          ))}
        </div>
      </div>
      <div className="bottom">
        {!isPlaying && <button onClick={handleGameStart}>PLAY</button>}
        {isPlaying && (
          <div>
            <span>PAYMENT </span>
            <span className="progress">
              {newPersonsCount - unpaidPersonsCount} | {newPersonsCount}
            </span>
          </div>
        )}
      </div>
      {isPlaying && (
        <OverlayContainer
          key={roundCount}
          roundCount={roundCount}
          newPersonsCount={newPersonsCount}
          persons={persons}
        />
      )}
    </>
  );
}

export default App;
