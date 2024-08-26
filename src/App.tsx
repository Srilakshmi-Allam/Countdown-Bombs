import React, { useState, useEffect } from "react";
import Timebomb from "./components/Timebomb/Timebomb";
import { randomTime } from "./utils/randomTime";
import "./styles.css";

interface BombState {
  name: string;
  timeLeft: number;
  exploded: boolean;
}

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [bombs, setBombs] = useState<BombState[]>([
    { name: "Bomb A", timeLeft: randomTime(), exploded: false },
    { name: "Bomb B", timeLeft: randomTime(), exploded: false },
    { name: "Bomb C", timeLeft: randomTime(), exploded: false },
    { name: "Bomb D", timeLeft: randomTime(), exploded: false },
  ]);

  useEffect(() => {
    if (started) {
      const intervalId = setInterval(() => {
        setBombs((prevBombs) =>
          prevBombs.map((bomb) => {
            if (bomb.timeLeft > 0) {
              return { ...bomb, timeLeft: bomb.timeLeft - 1 };
            } else if (!bomb.exploded) {
              return { ...bomb, exploded: true };
            } else {
              return bomb;
            }
          })
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [started]);

  const handleStart = () => setStarted(true);

  const allExploded = bombs.every((bomb) => bomb.exploded);

  return (
    <div className="App">
      <div className="bombs-container">
        {bombs.map((bomb, index) => (
          <Timebomb
            key={index}
            name={bomb.name}
            timeLeft={bomb.timeLeft}
            exploded={bomb.exploded}
          />
        ))}
      </div>
      <button onClick={handleStart} disabled={started || allExploded}>
        {allExploded
          ? "All bombs exploded"
          : started
          ? "Waiting to explode..."
          : "Explode"}
      </button>
    </div>
  );
};

export default App;
