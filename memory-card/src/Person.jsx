import { useEffect, useState } from "react";

const PERSON_GEN_ARGS = {
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
  ]
    .map((hexCode) => hexCode.replace("#", ""))
    .join(","),
};

async function fetchImageUrl(seed) {
  const baseUrl = "https://api.dicebear.com/10.x/dylan/svg";

  const query = [
    `skinColor=${PERSON_GEN_ARGS.skinColor}`,
    `seed=${seed}`,
    `backgroundColor=`,
  ].join("&");

  const url = `${baseUrl}?${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Can't get character image: ${response.status}`);
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob); // CREATING MEMORY LEAK
    return imgUrl;
  } catch (error) {
    console.error(error.message);
  }
}

function Person({ seed, row, col, clickHandle }) {
    const [imgUrl, setimgUrl] = useState(null);

    useEffect(() => {
      let objectUrl = null;
      let ignoreResult = false;

      fetchImageUrl(seed).then((url) => {
        objectUrl = url;
        if (!ignoreResult) {
          setimgUrl(url);
        } else {
          URL.revokeObjectURL(url);
        }
      });

      return () => {
        ignoreResult = true;
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }, [seed]);

    return (
      <div onClick={() => clickHandle(row, col)}
        className="person"
        style={{
          // Convert 0-based indices to 1-based CSS Grid lines (+1)
          gridRow: `${row + 1} / ${row + 2}`,
          gridColumn: `${col + 1} / ${col + 2}`,
        }}
      >
        {imgUrl && <img src={imgUrl} alt="character" />}
      </div>
    );
}

export default Person;
