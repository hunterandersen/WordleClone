import React from 'react'
import { useState } from 'react';
import Tile from './Tile'

function TileRow( { wordGuess }) {
    const [tileLetters, setTileLetters] = useState(['', '', '', '', '']);
    const dummyArray = ['', '', '', '', ''];

    return (
        <div className="tileRow">
            {/* {console.log('Returning/Rendering')} */}
            {/* {tileLetters.map((thing, index, array)=>{
                return <Tile key={index} letter={thing} index={index} checkLetter={updateTile} checkBackspace={checkBackspace}/>
            })} */}
            {dummyArray.map((item, index, array) => {
                if (wordGuess[index] === ''){
                    return <Tile key={index} letter={" "} index={index}/>
                }else{
                    return <Tile key={index} letter={wordGuess[index]} index={index}/>
                }
            })}
        </div>
    )
    
}

export default TileRow