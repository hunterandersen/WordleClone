import React from 'react'

function KeyboardKey({ keyValue, color, handleClickFunc }) {
    return (
        <div className='keyboardKey' onClick={handleClickFunc} style={{backgroundColor:color}}>{keyValue}</div>
    )
}

export default KeyboardKey;