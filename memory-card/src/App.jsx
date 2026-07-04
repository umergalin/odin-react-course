import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img className="avatar"></img>
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => {
            getImage(document.querySelector('.avatar'), 120);
            setCount((count) => count + 1);
          }}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
