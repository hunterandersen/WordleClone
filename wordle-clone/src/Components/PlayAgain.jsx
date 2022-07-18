import React from 'react';
import { MESSAGE_WIN } from "../resources/MyConstants";

export default function PlayAgain({ handlePress, statusMessage }) {
  let statusColor = statusMessage===MESSAGE_WIN ? "statusColorGreen" : "statusColorRed";
  let borderColor = statusMessage===MESSAGE_WIN ? "playAgainBorderGreen" : "playAgainBorderRed";
  return (
    <button className={`playAgain ${borderColor}`} onClick={handlePress}>
      <h2 className={statusColor}>{statusMessage}</h2>
      <h2 className="titleColor">Play Again</h2>
    </button>
  )
}
