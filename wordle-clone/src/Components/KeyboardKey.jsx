import React from 'react'

function KeyboardKey({ keyValue, color, handleClickFunc }) {
    return (
        <div 
            className={`keyboardKey ${keyValue === 'BACKSPACE' ? 'keyboardBackKey' : ''} ${keyValue === 'ENTER' ? 'keyboardEnterKey' : ''}`}
            onClick={handleClickFunc}
            style={{backgroundColor:color}}
        >
            {keyValue === 'BACKSPACE'? "BACK" : keyValue}
        </div>
    )
}

export default KeyboardKey;