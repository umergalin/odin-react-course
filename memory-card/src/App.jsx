import { useState } from "react";
import "./App.css";

import { generateSeed } from "./js/utils.js";
import Person from "./Person.jsx";
import OverlayContainer from "./OverlayContainer.jsx";

const HALF_COLLS_COUNT = 2; // one side def prevents even grid
const TOTAL_COLLS_COUNT = HALF_COLLS_COUNT * 2 + 1;
const TOTAL_ROWS_COUNT = 4;

const MAX_EMPTY_CELL_COUNT = 2;
const MAX_NEW_PEOPLE_COUNT = 5;
const DIFFICULTY_GROWTH_RATE = 1;

function getNewPersonsCount(round) {
  const newPersonsCount = Math.round(Math.sqrt(round * DIFFICULTY_GROWTH_RATE));
  return Math.min(MAX_NEW_PEOPLE_COUNT, newPersonsCount);
}

function getFreeCells(currentPersons) {
  const occupied = Array(TOTAL_ROWS_COUNT * TOTAL_COLLS_COUNT).fill(false);

  currentPersons.forEach((currentPerson) => {
    occupied[currentPerson.row * TOTAL_COLLS_COUNT + currentPerson.col] = true;
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

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [roundCount, setRoundCount] = useState(0);

  const [lives, setLives] = useState(0);

  const [score, setScore] = useState(0);
  const storedHighScore = Number(localStorage.getItem("highScore"));
  const [highScore, setHighScore] = useState(
    Number.isFinite(storedHighScore) ? storedHighScore : 0,
  );

  const [persons, setPersons] = useState([]);
  const newPersonsCount = getNewPersonsCount(roundCount);
  const unpaidPersonsCount = persons.filter((p) => !p.hasPaid).length;

  function prepareBoardSpace(nextNewPersonsCount) {
    const targetEmptyCells = Math.floor(Math.random() * MAX_EMPTY_CELL_COUNT);
    const maxSpace = TOTAL_ROWS_COUNT * HALF_COLLS_COUNT * 2;

    console.log("random empy space: " + targetEmptyCells);

    setPersons((prevPersons) => {
      const excessCount =
        targetEmptyCells + prevPersons.length + nextNewPersonsCount - maxSpace;
      return excessCount <= 0 ? prevPersons : prevPersons.slice(excessCount);
    });
  }

  function createPersonChunk(count) {
    setPersons((prevPersons) => {
      const freeCells = getFreeCells(prevPersons);
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

      return [...prevPersons, ...newPersons];
    });
  }

  function removePerson(row, col) {
    setPersons((prev) =>
      prev.filter((person) => person.row !== row || person.col !== col),
    );
  }

  function handlePersonClick(targetSeed) {
    if (!isPlaying) return;

    const target = persons.find((p) => p.seed === targetSeed);
    if (!target) return;

    if (target.hasPaid) {
      if (lives <= 1) {
        setLives(0);
        handleGameEnd();
      } else {
        setLives((prevLives) => prevLives - 1);
      }
      return;
    }

    setPersons((prev) =>
      prev.map((person) =>
        person.seed === targetSeed ? { ...person, hasPaid: true } : person,
      ),
    );

    setScore((prevScore) => prevScore + 1);

    if (unpaidPersonsCount === 1) startRound(roundCount + 1);
  }

  function startRound(nextRound) {
    setRoundCount(nextRound);

    const nextNewPersonsCount = getNewPersonsCount(nextRound);
    prepareBoardSpace(nextNewPersonsCount);
    createPersonChunk(nextNewPersonsCount);
  }

  function handleGameStart() {
    setScore(0);
    setLives(3);
    setPersons([]);
    setIsPlaying(true);

    startRound(1);
  }

  function handleGameEnd() {
    setIsPlaying(false);

    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    }
  }

  return (
    <>
      <div className="top">
        <div className={`score ${isPlaying ? "playing" : ""}`}>
          {isPlaying && (
            <div className="text-primary">
              <span>POINTS </span>
              <span>{score}</span>
            </div>
          )}
          <div className={`high-score ${isPlaying ? "text-secondary" : "text-primary"}`}>
            <span>HIGH SCORE </span>
            <span className="record">{highScore}</span>
          </div>
        </div>
        {isPlaying && (
          <div className="lives">
            <span>LIVES </span>
            <span>{lives}</span>
          </div>
        )}
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
        {!isPlaying && (
          <button
            className="text-primary play-btn"
            type="button"
            onClick={handleGameStart}
          >
            PLAY
          </button>
        )}
        {isPlaying && (
          <div className="text-primary">
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
