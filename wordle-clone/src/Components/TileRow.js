import React from 'react'
import { useState } from 'react';
import Tile from './Tile'

function TileRow() {
    const [tileLetters, setTileLetters] = useState(['', '', '', '', '']);

    function isAlphaText(text){
        let alphaExpression = /^[a-zA-Z]+$/;

        if (text.match(alphaExpression)){
            return true;
        }else
            return false;

    }

    const updateTile = (event, index) => {
        let newLetter = event.target.value.substring(event.target.value.length - 1);
        console.log(event.target.value);
        console.log(`Testing ${index}`);

        if (isAlphaText(newLetter)){

            let newLetters = tileLetters.slice();
            newLetters[index] = newLetter;

            console.log(`tileLetters at index: ${tileLetters[index]}`);
            console.log(`newLetters at index: ${newLetters[index]}`);
            setTileLetters(newLetters);

            console.log(tileLetters);
        }
        
    }

    return (
        <div>
            {console.log('Returning/Rendering')}
            <h1>My Tiles</h1>
            {tileLetters.map((thing, index, array)=>{
                {console.log(thing)}
                return <Tile key={index} letter={thing} index={index} checkLetter={updateTile}/>
            })}
        </div>
    )
    
}

export default TileRow