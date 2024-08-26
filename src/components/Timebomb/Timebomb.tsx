import React from "react";

interface TimebombProps {
  name: string;
  timeLeft: number;
  exploded: boolean;
}

const Timebomb: React.FC<TimebombProps> = ({ name, timeLeft, exploded }) => {
  return (
    <div className="timebomb">
      <span>{name}</span>
      <span>{exploded ? "Exploded" : `Time left: ${timeLeft} seconds`}</span>
    </div>
  );
};

export default Timebomb;
