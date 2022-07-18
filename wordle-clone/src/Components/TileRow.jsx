import React from 'react'
import Tile from './Tile'

function TileRow( { wordGuess, colors }) {
    return (
        <div className="tileRow">
            {colors && colors.map((item, index, array) => {
                if (wordGuess[index] === ''){
                    return <Tile key={index} letter={" "} color={item} index={index}/>
                }else{
                    return <Tile key={index} letter={wordGuess[index]} color={item} index={index}/>
                }
            })}
        </div>
    )
    
}

export default TileRow