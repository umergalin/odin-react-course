import { useState } from 'react'
import './App.css'

import { generateSeed } from './js/utils.js'

const CHAR_GEN_ARGS = {
  skinColor: [
    "#6f3e39",
    "#7d4b40",
    "#8c4a25",
    "#975140",
    "#995c30",
    "#a46649",
    "#b76e44",
    "#c6775c",
    "#e18d6f",
    "#e59d65",
    "#f39f7c",
    "#ffb99e",
    "#ffc5b7",
    "#ffcba3",
    "#ffe1d5",
  ].map(hexCode => hexCode.replace("#", "")).join(","),
};

async function getImage(imgContainer) {
  const baseUrl = "https://api.dicebear.com/10.x/dylan/svg";
  const seed = generateSeed(8);

  const query = [
    `skinColor=${CHAR_GEN_ARGS.skinColor}`,
    `seed=${seed}`,
    `backgroundColor=`
  ].join("&");

  const url = `${baseUrl}?${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Can't get character image: ${response.status}`);
    }

    const blob = await response.blob();
    const objUrl = URL.createObjectURL(blob); // CREATING MEMORY LEAK
    imgContainer.src = objUrl;
  } catch (error) {
    console.error(error.message);
  }
}

function App() {
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
      <div className="arrangement">
        
      </div>
    </div>
    <div className="bottom">
      <div>
        <span>PAYMENT </span>
        <span className="progress">X | X</span>
      </div>
    </div>
    </>
  )
}

export default App
