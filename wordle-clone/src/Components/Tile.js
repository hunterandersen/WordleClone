import React from 'react'

function Tile({ letter, index, checkLetter}) {

    return (
        <div className="tile">
            {console.log(`Child Tile is rendering... ${letter}`)}
            <input type="text" value={letter} onChange={(event) => checkLetter(event, index)}></input>
        </div>
    )
    
}

export default Tile