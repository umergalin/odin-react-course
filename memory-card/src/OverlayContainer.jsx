import { useEffect, useState } from "react";
import Person from "./Person";

function OverlayContainer ({newPersonsCount, persons}) {
    const [isMounted, setIsMounted] = useState(false);
    const [prevPersonsCount, setPrevPersonsCount] = useState(0);

    if (newPersonsCount >= 1 && prevPersonsCount !== newPersonsCount) {
      setPrevPersonsCount(newPersonsCount);
      setIsMounted(true);
    }

    useEffect(() => {
      if (!isMounted) return;

      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }, [isMounted]);

    if (!isMounted) return null;

    const handleTransitionEnd = () => {
      setIsMounted(false);
    };

    return (
      <div
        className={`overlay ${isMounted ? "show" : ""}`}
      > <p>Some people entered the bus...</p>
        {isMounted && (
          <div className="new-persons-list">
            {persons
              .slice(-newPersonsCount)
              .map(({ seed, row, col }) => (
                <Person
                  key={seed}
                  seed={seed}
                  row={row}
                  col={col}
                />
              ))}
          </div>
        )}
      </div>
    );
}

export default OverlayContainer;