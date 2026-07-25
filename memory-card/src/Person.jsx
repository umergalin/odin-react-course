import { use, useEffect, useState } from "react";
import { getImage } from "./imageCash";

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

function getImageUrl(seed) {
  const baseUrl = "https://api.dicebear.com/10.x/dylan/svg";

  const query = [
    `skinColor=${PERSON_GEN_ARGS.skinColor}`,
    `seed=${seed}`,
    `backgroundColor=`,
  ].join("&");

  const url = `${baseUrl}?${query}`;

  return url;
}

function Person({ seed, row, col, clickHandle }) {
  const [imgObjUrl, setImgObjUrl] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    let ignoreResult = false;

    getImage(getImageUrl(seed)).then((objUrl) => {
      if (!ignoreResult) {
        setImgObjUrl(objUrl);
      }
    });

    return () => {
      // WARNING: Not aborting the download
      // the final image will remain in the global cache.
      ignoreResult = true;
    };
  }, [seed]);

  return (
    <div
      onClick={() => clickHandle?.(seed)}
      className="person"
      style={{
        // Convert 0-based indices to 1-based CSS Grid lines (+1)
        gridRow: `${row + 1} / ${row + 2}`,
        gridColumn: `${col + 1} / ${col + 2}`,
      }}
    >
      {imgObjUrl && <img src={imgObjUrl} alt="character" />}
    </div>
  );
}

export default Person;
