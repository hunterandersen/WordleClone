import './App.css';
import { useState } from 'react';
import TileRow from './Components/TileRow';

function App() {

  const [currentWord, setCurrentWord] = useState(["", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleKeyDown(event){
    let key = event.key;

    if(currentIndex < 6){
      if(key === "Backspace" && currentWord[currentIndex].length > 0){
        //Delete the last character

        //Using slice creates a "new" version of the array
        //If I don't do that, then when I set it later, it's still
        //pointing to the same spot, so it won't rerender.
        let tempArray = currentWord.slice(); 
        tempArray[currentIndex] = tempArray[currentIndex].substring(0, tempArray[currentIndex].length-1);

        setCurrentWord(tempArray);
      } else if(isAlphaText(key) && currentWord[currentIndex].length < 5){
        //Add character to current word guess
        
        let tempArray = currentWord.slice(); 
        tempArray[currentIndex] += key;

        setCurrentWord(tempArray);
      } else if(key === "Enter" && currentWord[currentIndex].length === 5){
        //The player made a guess
        let newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
      }
    }

  }


  function isAlphaText(text){
    let alphaExpression = /^[a-zA-Z]$/;

    if (text.match(alphaExpression)){
        return true;
    }else
        return false;

  }

  return (
    <div className="app" 
    onKeyDown={(e) => handleKeyDown(e)}
    tabIndex={-1}
    >
      <h1 className="title" >Wordle Clone</h1>
      {currentWord.map((word, index, array) => {
        return <TileRow wordGuess={word} key={index}/>
      })}
    </div>
  );
}

export default App;
