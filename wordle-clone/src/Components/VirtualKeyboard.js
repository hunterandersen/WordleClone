import React from 'react'
import KeyboardKey from './KeyboardKey'

//Responsible for each individual key and its layout
function VirtualKeyboard({ colors, handleClickFunc }) {
  return (
    <div className='keyboardContainer'>
        <div className='keyboardRowOne'>
            <KeyboardKey keyValue={'Q'} color={colors['Q'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'W'} color={colors['W'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'E'} color={colors['E'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'R'} color={colors['R'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'T'} color={colors['T'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'Y'} color={colors['Y'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'U'} color={colors['U'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'I'} color={colors['I'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'O'} color={colors['O'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'P'} color={colors['P'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
        </div>
        <div className='keyboardRowTwo'>
            <KeyboardKey keyValue={'A'} color={colors['A'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'S'} color={colors['S'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'D'} color={colors['D'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'F'} color={colors['F'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'G'} color={colors['G'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'H'} color={colors['H'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'J'} color={colors['J'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'K'} color={colors['K'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'L'} color={colors['L'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
        </div>
        <div className='keyboardRowThree'>
            <KeyboardKey keyValue={'ENTER'} color={colors[28]} handleClickFunc={handleClickFunc}/>
            <KeyboardKey keyValue={'Z'} color={colors['Z'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'X'} color={colors['X'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'C'} color={colors['C'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'V'} color={colors['V'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'B'} color={colors['B'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'N'} color={colors['N'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'M'} color={colors['M'.charCodeAt(0)-65]} handleClickFunc={handleClickFunc} />
            <KeyboardKey keyValue={'BACKSPACE'} color={colors[29]} handleClickFunc={handleClickFunc} />
        </div>
    </div>
  )
}

export default VirtualKeyboard