import { useEffect, useState } from "react";
import Person from "./Person";

function OverlayContainer ({newPersonsCount, persons}) {
    const [isMounted, setIsMounted] = useState(true);

    if (!isMounted) return null;

    const onDismiss = () => {
      setIsMounted(false);
    };

    return (
      <div
        className={`overlay ${isMounted ? "show" : ""}`}
        onClick={onDismiss}
      >
        <p>Some people entered the bus...</p>
        {isMounted && (
          <div className="new-persons-list">
            {persons.slice(-newPersonsCount).map(({ seed, row, col }) => (
              <Person key={seed} seed={seed} row={row} col={col} />
            ))}
          </div>
        )}
        
        <p>Click to continue</p>
      </div>
    );
}

export default OverlayContainer;