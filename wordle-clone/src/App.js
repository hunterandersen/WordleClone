import './style.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import TileRow from './Components/TileRow';
import VirtualKeyboard from './Components/VirtualKeyboard';
import PlayAgain from './Components/PlayAgain';
import Status from './Components/Status';
import * as MyConstants from './resources/MyConstants'

//Bring in the list of acceptable 5 letter words
import wordlist from './resources/FiveLetterWords-paredDown.txt'

let defaultColors = [];
let keyboardDefaultColors = [];
//Initialize the grid of guesses
for (let i = 0; i < 6; i++){
  defaultColors[i] = [MyConstants.GREY_COLOR, MyConstants.GREY_COLOR, MyConstants.GREY_COLOR, MyConstants.GREY_COLOR, MyConstants.GREY_COLOR];
}
//Initialize the virtual keyboard colors
for (let i = 0; i < 28; i++){
  keyboardDefaultColors[i] = MyConstants.VIRTUAL_KEY_DEFAULT;
}
//ENTER KEY
keyboardDefaultColors[28] = MyConstants.VIRTUAL_KEY_DEFAULT;
//BACKSPACE KEY
keyboardDefaultColors[29] = MyConstants.VIRTUAL_KEY_DEFAULT;

function App() {
  const [currentWord, setCurrentWord] = useState(["", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [tileColors, setTileColors] = useState(defaultColors.slice());
  const [wordToGuess, setWordToGuess] = useState("");
  const [statusMessage, setStatusMessage] = useState(`${MyConstants.MESSAGE_START}`);
  const [keyboardColors, setKeyboardColors] = useState(keyboardDefaultColors.slice());
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const focusDiv = useRef(null);

  function setupWordGuess(dictionary){
    let tempWord = dictionary[Math.round(Math.random() * dictionary.length)];
    setWordToGuess(tempWord);
  }
  
  //Focus so that typing registers key presses
  function focusPage(){
    if (focusDiv.current){
      focusDiv.current.focus();
    }
  }
  
  function initGame(dictionary){
    setCurrentWord(["", "", "", "", "", ""]);
    setCurrentIndex(0);
    setTileColors(defaultColors.slice());
    setStatusMessage(MyConstants.MESSAGE_START);
    setKeyboardColors(keyboardDefaultColors.slice());
    setupWordGuess(dictionary);
    focusPage();
    setHasGameEnded(false);
  }

  const initGameCallback = useCallback(initGame, []);

  //Gets the list of acceptable English words
  useEffect(() =>{
    fetch(wordlist)
    .then(response => response.text())
    .then(text => {
      //This could be made slightly more efficient by implementing useReducer so that I don't need this temporary variable
      let tempDictionary;
      if (text.includes("\r\n")){
        tempDictionary = text.split("\r\n");
      } else {
        tempDictionary = text.split("\n");
      }
      setAcceptedWords(tempDictionary);
      initGameCallback(tempDictionary);
    })
<<<<<<< HEAD
    .catch(console.error);
  }, []);
=======
    .catch(e => {console.error(e)})
  }, [initGameCallback]);
>>>>>>> cac028e8e095202de66542002c1c7e825336094d

  function handleKey(key){
    if(currentIndex < 6){
      if((key === "BACKSPACE" || key === "BACK") && currentWord[currentIndex].length > 0){
        //Delete the last character

        //Using slice creates a "new" version of the array
        //If I don't do that, then when I set it later, it's still
        //pointing to the same spot, so it won't rerender.
        let tempArray = currentWord.slice(); 
        tempArray[currentIndex] = tempArray[currentIndex].substring(0, tempArray[currentIndex].length-1);

        //Reset the status message
        if (currentWord[currentIndex].length === 5){
          setStatusMessage(MyConstants.MESSAGE_START);
        }
        setCurrentWord(tempArray);
      } else if(isAlphaText(key) && currentWord[currentIndex].length < 5){
        //Add character to current word guess
        let tempArray = currentWord.slice(); 
        tempArray[currentIndex] += key;

        setCurrentWord(tempArray);
      } else if(key === "ENTER" && currentWord[currentIndex].length === 5){
        //check the word
        if (isValidWord(currentWord[currentIndex])){
          //The player made a guess, so move to the next row
          let newIndex = currentIndex + 1;

          //update the tile colors for the guessed word
          let tempArray = tileColors.slice();
          tempArray[currentIndex] = findMatchingTiles(currentWord[currentIndex], wordToGuess);
          let secondArray = parseMatchingTiles(currentWord[currentIndex], tempArray[currentIndex]);
          setKeyboardColors(secondArray);
          setTileColors(tempArray);

          if (simpleArrayEquals(tempArray[currentIndex], MyConstants.WINNING_ARRAY_COLOR)){
            //Player Win Condition
            setStatusMessage(`${MyConstants.MESSAGE_WIN}`);
            newIndex = 7;//Prevent user from guessing once they've won
            setHasGameEnded(true);
          }else if (newIndex >= 6){
            //Player Lose Condition
            setStatusMessage(`${MyConstants.MESSAGE_GAME_OVER} ${wordToGuess.toUpperCase()}`);
            setHasGameEnded(true);
          }
          setCurrentIndex(newIndex);
        }else{
          //Let user know that the word they tried was unacceptable
          setStatusMessage(`${MyConstants.MESSAGE_NOT_WORD}`);
        }
      }
    }
  }

  function handleVirtualKey(event){
    let key = event.target.innerHTML;
    handleKey(key);
  }

  function handleKeyDown(event){
    let key = event.key.toUpperCase();
    handleKey(key);
  }

  function handlePlayAgain(){
    initGame(acceptedWords);
  }

  /*Assumes that the guess variable is a five letter string
  Also assumes that the wordlist is alphabetized A-Z
  Uses a binary search to find the word in the dictionary at O(log(N))
  */
  function isValidWord(guess){
    if(guess && acceptedWords && acceptedWords.length > 0){ //make sure the words have been fetched
      let lowerBound = 0;
      let upperBound = acceptedWords.length;
      guess = guess.toLowerCase();

      while(lowerBound<upperBound){
        if(guess < acceptedWords[Math.floor((upperBound+lowerBound)/2)]){
          //Then search alphabetically lower
          upperBound = Math.floor((upperBound+lowerBound)/2);
        }else if (guess === acceptedWords[Math.floor((upperBound+lowerBound)/2)]){
          //Found our word!
          return true;
        }else{
          //Then search alphatebically higher
          lowerBound = Math.floor((upperBound+lowerBound)/2);
        }
        //This keeps the function from searching forever on the last word
        if(lowerBound === upperBound-1 || lowerBound === upperBound){
          if (guess === acceptedWords[lowerBound] || guess === acceptedWords[upperBound]){
            return true;
          }
          return false;
        }
      }

    }
    return false;
  }

  function parseMatchingTiles(guessWord, matchingTiles){
    let resultArray = keyboardColors.slice();
    for (let i = 0; i < guessWord.length; i++){
      //Never overwrite a Green value
      if(keyboardColors[guessWord[i].charCodeAt(0)-65] !== MyConstants.GREEN_COLOR){
        //If it's green or yellow
        if (matchingTiles[i] !== MyConstants.WRONG_COLOR){
          //Return whatever color it is
          resultArray[guessWord[i].charCodeAt(0)-65] = matchingTiles[i]; 
        }else{
          //Otherwise, it's the wrong color
          resultArray[guessWord[i].charCodeAt(0)-65] = MyConstants.WRONG_COLOR;
        }
      }
    }
    return resultArray;
  }

  //Check for efficiency improvements. Should be a few I assume
  function findMatchingTiles(guess, targetWord){
    if (guess && targetWord){
      guess = guess.toUpperCase();
      targetWord = targetWord.toUpperCase();
      let matches = [];
      for (let i = 0; i < guess.length; i++){
        if (guess[i] === targetWord[i]){
          //Remove it so it doesn't count for a potential next yellow letter
          targetWord = targetWord.replace(guess[i], ' ');
          matches[i] = MyConstants.GREEN_COLOR;
        }
      }
      for (let i = 0; i < guess.length; i++){
        if(matches[i] === MyConstants.GREEN_COLOR){

        }
        else if (targetWord.includes(guess[i])){
          //Remove it so it doesn't count for a potential next yellow letter
          targetWord = targetWord.replace(guess[i], ' ');
          matches[i] = MyConstants.YELLOW_COLOR;
        }else{
          matches[i] = MyConstants.WRONG_COLOR;
        }
      }
      
      return matches;
    }
    return null;
  }

  function simpleArrayEquals(array1, array2){
    if (!array1 || !array2){
      return false;
    }
    if (array1.length !== array2.length){
      return false;
    }

    for (let i = 0; i < array1.length; i++){
      if (array1[i] !== array2[i]){
        return false;
      }
    }

    return true;
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
    ref={focusDiv}
    >
      <h1 className="title">{MyConstants.TITLE_MAIN}</h1>
      {hasGameEnded? <PlayAgain handlePress={handlePlayAgain} statusMessage={statusMessage}/> : <Status statusMessage={statusMessage}/>}
      {currentWord.map((word, index) => {
        return <TileRow wordGuess={word} colors={tileColors[index]} key={index}/>
      })}
      <VirtualKeyboard colors={keyboardColors} handleClickFunc={handleVirtualKey}/>
    </div>
  );
}

export default App;
