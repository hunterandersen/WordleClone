import './App.css';
import { useState, useEffect, useRef } from 'react';
import TileRow from './Components/TileRow';

//Bring in the list of acceptable 5 letter words
import wordlist from './resources/FiveLetterWords.txt'

function App() {

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
  const [statusMessage, setStatusMessage] = useState("Guess A Word");
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
            setStatusMessage("Correct! You Win!");
            newIndex = 7;//Prevent user from guessing once they've won
          }else if (newIndex >= 6){
            //Player Lose Condition
            setStatusMessage(`Game Over. The word was: ${wordToGuess.toUpperCase()}`);
          }
          setCurrentIndex(newIndex);
        }else{
          setStatusMessage(`Word Not Found, Try Again`);
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
      
      let matches = guess.split("").map((letter, index, array) => {
        if (letter === targetWord[index]){
          return GREEN_COLOR;
        }
        else if (targetWord.includes(letter)){
          let occurencesInGuess = countLetterInWord(letter, guess);
          let occurencesInTargetWord = countLetterInWord(letter, targetWord);
          if (occurencesInGuess > occurencesInTargetWord){
            //If there are more occurences of a letter in the guessed word, than in the target word, then it might be tricky.
            //Show yellow as long as this occurence of the letter is <= the number of occurences of the letter in the target word.
            //Find which occurence we're at now. Then see if that is still less than the total occurences in the target word.
            let thisOccurence = guess.substring(0, index+1).split(letter).length-1;
            if (thisOccurence <= occurencesInTargetWord){
              return YELLOW_COLOR;
            }else{
              return WRONG_COLOR;
            }
          }
          return YELLOW_COLOR;
        }
        return WRONG_COLOR;
      });
      return matches;
    }
    return null;
  }

  function countLetterInWord(letter, word){
    if (letter && word){
      letter = letter.toLowerCase();
      word = word.toLowerCase();
      let count = 0;
      let wordArray = word.split("");
      for (let index in wordArray){
        if (wordArray[index] === letter){
          count++;
        }
      }
      return count;
    }
    return -1;
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
      <h1 className="title" >Wordle Clone</h1>
      <h2 className="statusMessage">{statusMessage}</h2>
      {currentWord.map((word, index, array) => {
        return <TileRow wordGuess={word} colors={tileColors[index]} key={index}/>
      })}
    </div>
  );
}

export default App;
