import React from 'react'
/* import { useState } from 'react'; */
import Tile from './Tile'

function TileRow( { wordGuess, colors }) {
    /* const [tileLetters, setTileLetters] = useState(['', '', '', '', '']);
    
    const placeHolderArray = ['', '', '', '', '']; */

    return (
        <div className="tileRow">
            {/* {placeHolderArray.map((item, index, array) => {
                if (wordGuess[index] === ''){
                    return <Tile key={index} letter={" "} index={index}/>
                }else{
                    return <Tile key={index} letter={wordGuess[index]} index={index}/>
                }
            })} */}
            {colors? colors.map((item, index, array) => {
                if (wordGuess[index] === ''){
                    return <Tile key={index} letter={" "} color={item} index={index}/>
                }else{
                    return <Tile key={index} letter={wordGuess[index]} color={item} index={index}/>
                }
            }) : <>No Colors</>}
        </div>
    )
    
}

export default TileRow