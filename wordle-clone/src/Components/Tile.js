import React from 'react'

function Tile({ letter, index/* , checkLetter, checkBackspace */}) {

    return (
        <div className="tile"
            id={`tile-${index}`}
            
        >
        {letter}
        </div>
    )
    
}

export default Tile