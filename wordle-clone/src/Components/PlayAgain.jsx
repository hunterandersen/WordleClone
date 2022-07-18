import React from 'react'

export default function PlayAgain({ handlePress, statusMessage }) {
  return (
    // <button className="playAgain" onClick={handlePress}>
    <button className="playAgain" onClick={handlePress}>
      <h2 className="statusColorGreen">{statusMessage}</h2>
      <h2 className="titleColor">Play Again</h2>
    </button>
  )
}
