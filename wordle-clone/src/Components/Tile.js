import React from 'react'

function Tile({ letter, index, checkLetter, checkBackspace}) {

    return (
        <div className="tile">
            <input 
                className='tileInput'
                id={`tile-${index}`}
                type="text" 
                value={letter}
                onChange={(event) => checkLetter(event, index)}
                onKeyDown={(event) => checkBackspace(event, index)}
            >
            </input>
        </div>
    )
    
}

export default Tile