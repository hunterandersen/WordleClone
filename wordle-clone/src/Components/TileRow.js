import React from 'react'
import { useState } from 'react';
import Tile from './Tile'

function TileRow() {
    const [tileLetters, setTileLetters] = useState(['', '', '', '', '']);

    const updateTile = (event, index) => {
        let newLetter = event.target.value.substring(event.target.value.length - 1);

        if (isAlphaText(newLetter)){
            //Copy the current state into a temporary array
            let newLetters = tileLetters.slice();
            //Update the necessary state
            newLetters[index] = newLetter;
            //Set the state. This will trigger a rerender
            setTileLetters(newLetters);
            focusTile(index, 1);

        } else if (newLetter == ''){
            console.log(`NewLetter is empty string: ${newLetter}`);
            //Copy the current state into a temporary array
            let newLetters = tileLetters.slice();
            //Update the necessary state
            newLetters[index] = newLetter;
            //Set the state. This will trigger a rerender
            setTileLetters(newLetters);
            focusTile(index, -1);

        }else {
            console.log('Character is unacceptable');
        }
        
    }

    function checkBackspace(event, index){
        if(event.key === "Backspace" && event.target.value === ''){
            focusTile(index, -1);
        }
    }

    /*
        Helper function to focus one of the tiles in the tile row.
        Takes the starting index position (1-5) and 
        how far to the right or left you'd like the focus to change.
        Sets the focus if possible.
    */
    function focusTile(index, delta){
        let nextTile = document.getElementById(`tile-${index+delta}`);
        console.log(`Index:${index} , Delta:${delta}`);
        if (nextTile){
            //Set the window focus to this tile so that the user can continue typing seamlessly
            nextTile.focus();
        }
    }

    /*Utility function
        Takes some string value
        Returns whether or not that string is alphabetical
    */
    function isAlphaText(text){
        let alphaExpression = /^[a-zA-Z]$/;

        if (text.match(alphaExpression)){
            return true;
        }else
            return false;

    }

    return (
        <div className="tileRow">
            {console.log('Returning/Rendering')}
            {tileLetters.map((thing, index, array)=>{
                return <Tile key={index} letter={thing} index={index} checkLetter={updateTile} checkBackspace={checkBackspace}/>
            })}
        </div>
    )
    
}

export default TileRow