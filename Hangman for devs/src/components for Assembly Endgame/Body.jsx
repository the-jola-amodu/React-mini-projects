import { languages } from './languages'
import './Body.css'
import { useState } from 'react'
import { randomWord } from './utils'
import Confetti from 'react-confetti'

export default function Body(){ 
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const [currentWord, setCurrentWord] = useState(() => randomWord())
    const [guessedLetter, setGuessedLetter] = useState([])
    var wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1 ? true : false
    function handleClick(event){ 
        const thisElement = event.target
        setGuessedLetter(arr => arr.includes(thisElement.textContent) ? arr : [...arr, thisElement.textContent])
        thisElement.className += currentWord.includes(thisElement.textContent) ? ' correct' : ' incorrect'
    }
    function handleNewGame(){
        setGuessedLetter([])
        setCurrentWord(randomWord())
    }
    var statusBar = <div className='status-bar'></div>
    const alphabetElements = alphabet.toUpperCase().split("").map(letter => <button disabled={isGameLost || isGameWon} 
                                                                                    key={letter} 
                                                                                    className={!(isGameLost || isGameWon) ? 'letter' : 'letter disabled'} 
                                                                                    onClick={() => handleClick(event)}>{letter}</button>)
    const wordElement = currentWord.toUpperCase().split('').map((letter, index) => <span key={index} className={isGameLost && !guessedLetter.includes(letter) ? 'word missed' : 'word'}>{guessedLetter.includes(letter) || isGameLost ? letter : ''}</span>)
    const langElements = languages.map((obj, index) => <span style={{backgroundColor: obj.backgroundColor, 
                                                     color: obj.color, 
                                                     borderRadius: "3px", 
                                                     height: "25px", 
                                                     padding: "4.5px", 
                                                     justifyContent: "center", 
                                                     alignItems: "center", 
                                                     display: "flex", 
                                                     position: "relative"}} key={obj.name} className={index + 1 <= wrongGuessCount ? "dead" : ""}>{obj.name}</span>)
    if(isGameWon){
        statusBar = <div style={{background: "green"}} className='status-bar'>You win! Well done🎉</div>
    }
    else if(!currentWord.includes(guessedLetter[guessedLetter.length - 1])){
        statusBar = <div className='status-bar' style={{background: languages.at(wrongGuessCount - 1).statusColor}}>{languages.at(wrongGuessCount - 1).eulogy}</div>
    }
    else{
        statusBar = <div className='status-bar'></div>
    }
    return <div className='main-container'>
            <header className='upper-text'>
                <h3>Assembly: Endgame</h3>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            {statusBar}
            <div className='languages'>
                {langElements}
            </div>
            <div className='current-word'>
                {wordElement}
            </div>
            <div className='keyboard'>
                {alphabetElements}
            </div>
            {(isGameLost || isGameWon) && <button onClick={handleNewGame} className='new-game'>New Game</button>}
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
        </div>
}