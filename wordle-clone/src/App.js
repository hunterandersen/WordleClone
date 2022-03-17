import './App.css';
import { useState, useEffect } from 'react';
import TileRow from './Components/TileRow';

//Bring in the list of acceptable 5 letter words
import wordlist from './resources/FiveLetterWords.txt'

function App() {

  let defaultColors = [[], [], [], [], [], []];

  for (let i = 0; i < 6; i++){
    for(let j = 0; j < 5; j++){
      defaultColors[i][j] = ['rgb(49, 49, 49)', 'rgb(49, 49, 49)', 'rgb(49, 49, 49)', 'rgb(49, 49, 49)', 'rgb(49, 49, 49)'];
    }
  }

  const [currentWord, setCurrentWord] = useState(["", "", "", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [acceptedWords, setAcceptedWords] = useState([]);
  const [tileColors, setTileColors] = useState(defaultColors.slice());
  const wordToGuess = "drill";

  //Gets the list of acceptable English words
  useEffect(() =>{
    fetch(wordlist)
    .then(response => response.text())
    .then(text => {
      setAcceptedWords(text.split("\n"));
    })
    .catch(e => {console.error(e)})

  }, []);

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
        //check the word
        if (isValidWord(currentWord[currentIndex])){
          //update the color for the guess
          let tempArray = tileColors.slice();
          tempArray[currentIndex] = findMatchingTiles(currentWord[currentIndex], wordToGuess);
          setTileColors(tempArray);

          //The player made a guess, so move to the next row
          let newIndex = currentIndex + 1;
          setCurrentIndex(newIndex);
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
      console.log(`Checking ${guess}`);

      while(lowerBound<upperBound){
        if(guess < acceptedWords[Math.floor((upperBound+lowerBound)/2)]){
          //Then search alphabetically lower
          upperBound = Math.floor((upperBound+lowerBound)/2);
          console.log(`Moving down: ${upperBound}`);
        }else if (guess === acceptedWords[Math.floor((upperBound+lowerBound)/2)]){
          //Found our word!
          console.log(`Acceptable word`)
          return true;
        }else{
          //Then search alphatebically higher
          lowerBound = Math.floor((upperBound+lowerBound)/2);
          console.log(`Moving up: ${lowerBound}`);
        }
        //This keeps the function from searching forever on the last word
        if(lowerBound === upperBound-1 || lowerBound === upperBound){
          if (guess === acceptedWords[lowerBound] || guess === acceptedWords[upperBound]){
            return true;
          }
          console.log(`Lower:${lowerBound}, Upper:${upperBound}`);
          return false;
        }
      }

    }
    return false;
  }

  function findMatchingTiles(guess, targetWord){
    let matches = guess.split("").map((letter, index, array) => {
      console.log(letter);
      console.log(targetWord[index]);
      if (letter === targetWord[index]){
        return 'rgb(0, 128, 0)';//green
      }
      else if (targetWord.includes(letter)){
        return 'rgb(248, 205, 15)';//yellow-orange
      }
      return 'rgb(49, 49, 49)';//grey
    });
    return matches;
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
      {/* <WordStatus /> */}
      {currentWord.map((word, index, array) => {
        return <TileRow wordGuess={word} colors={tileColors[index]} key={index}/>
      })}
    </div>
  );
}

export default App;
