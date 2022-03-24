import './App.css';
import { useState, useEffect, useRef } from 'react';
import TileRow from './Components/TileRow';

//Bring in the list of acceptable 5 letter words
import wordlist from './resources/FiveLetterWords.txt'

function App() {

  const MESSAGE_WIN = 'Correct! You Win!';
  const MESSAGE_NOT_WORD = 'Word Not Found, Try Again';
  const MESSAGE_GAME_OVER = 'Game Over. The word was:';
  const TITLE_MAIN = 'Wordle Clone';
  const MESSAGE_START = 'Guess A Word';

  const GREEN_COLOR = 'rgb(0, 128, 0)';
  const GREY_COLOR = 'rgb(49, 49, 49)';
  const WRONG_COLOR = 'rgb(39, 33, 33)'
  const YELLOW_COLOR = 'rgb(248, 205, 15)';
  const winningArrayColor = [GREEN_COLOR, GREEN_COLOR, GREEN_COLOR, GREEN_COLOR, GREEN_COLOR];

  let defaultColors = [];
  for (let i = 0; i < 6; i++){
      defaultColors[i] = [GREY_COLOR, GREY_COLOR, GREY_COLOR, GREY_COLOR, GREY_COLOR];
  }

  const [currentWord, setCurrentWord] = useState(["", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [tileColors, setTileColors] = useState(defaultColors.slice());
  const [wordToGuess, setWordToGuess] = useState("");
  const [statusMessage, setStatusMessage] = useState(`${MESSAGE_START}`);
  const focusDiv = useRef(null);

  //Gets the list of acceptable English words
  useEffect(() =>{
    fetch(wordlist)
    .then(response => response.text())
    .then(text => {
      //This could be made slightly more efficient by implementing useReducer so that I don't need this temporary variable
      let tempDictionary = text.split("\n");
      setAcceptedWords(tempDictionary);
      let tempWord = tempDictionary[Math.floor(Math.random() * tempDictionary.length)]
      setWordToGuess(tempWord);
    })
    .catch(e => {console.error(e)})

  }, []);

  //Focus on the webpage so the user can begin typing right away
  useEffect(() => {
    if (focusDiv.current){
      focusDiv.current.focus();
    }
  }, [focusDiv]);

  function handleKeyDown(event){
    let key = event.key.toUpperCase();

    if(currentIndex < 6){
      if(key === "BACKSPACE" && currentWord[currentIndex].length > 0){
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
      } else if(key === "ENTER" && currentWord[currentIndex].length === 5){
        //check the word
        if (isValidWord(currentWord[currentIndex])){
          //The player made a guess, so move to the next row
          let newIndex = currentIndex + 1;

          //update the tile colors for the guessed word
          let tempArray = tileColors.slice();
          tempArray[currentIndex] = findMatchingTiles(currentWord[currentIndex], wordToGuess);
          setTileColors(tempArray);

          if (simpleArrayEquals(tempArray[currentIndex], winningArrayColor)){
            //Player Win Condition
            setStatusMessage(`${MESSAGE_WIN}`);
            newIndex = 7;//Prevent user from guessing once they've won
          }else if (newIndex >= 6){
            //Player Lose Condition
            setStatusMessage(`${MESSAGE_GAME_OVER} ${wordToGuess.toUpperCase()}`);
          }
          setCurrentIndex(newIndex);
        }else{
          //Let user know that the word they tried was unacceptable
          setStatusMessage(`${MESSAGE_NOT_WORD}`);
        }
      }
    }

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

  //Check for efficiency improvements. Should be a few I assume
  function findMatchingTiles(guess, targetWord){
    if (guess && targetWord){
      guess = guess.toLowerCase();
      targetWord = targetWord.toLowerCase();
      
      let matches = [];

      for (let i = 0; i < guess.length; i++){
        console.log(`Checking: ${guess[i]} and ${targetWord[i]}`);
        if (guess[i] === targetWord[i]){
          targetWord = targetWord.replace(guess[i], ' ');//Remove it so it doesn't count for a potential yellow letter
          matches[i--] = GREEN_COLOR;
        }
      }
      for (let i = 0; i < guess.length; i++){
        console.log(matches[i]);
        if(matches[i] === GREEN_COLOR){
          //Feels like there should be a more elegant solution here.
        }
        else if (targetWord.includes(guess[i])){
          matches[i] = YELLOW_COLOR;
        }else{
          matches[i] = WRONG_COLOR;
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
      <h1 className="title" >{TITLE_MAIN}</h1>
      <h2 className="statusMessage">{statusMessage}</h2>
      {currentWord.map((word, index, array) => {
        return <TileRow wordGuess={word} colors={tileColors[index]} key={index}/>
      })}
      <div>
        {/*
          I want this to be a  virtual keyboard
          So, each key should be a clickable item
          Thinking either button, or just raw div
          
        */}
      </div>
    </div>
  );
}

export default App;
