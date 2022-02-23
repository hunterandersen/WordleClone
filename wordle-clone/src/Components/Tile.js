import React from 'react'

function Tile({ letter, index, checkLetter, checkBackspace}) {

    return (
        <div className="tile">
            {console.log(`Child Tile is rendering... ${letter}`)}
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