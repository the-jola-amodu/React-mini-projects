import Die from './Die'
import './Body.css'
import { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function Body(){
    const allowedMoves = 10
    const [diceArray, setDiceArray] = useState(() => allNewDice())
    const [moveCount, setMoveCount] = useState({usedMoves: 0, allowed: allowedMoves})
    const buttonRef = useRef(null)
    const gameWon = diceArray.every(die => die.isHeld) &&
                    diceArray.every(die => die.value === diceArray[0].value)
    const gameLost = moveCount.allowed - moveCount.usedMoves <= 0
                    && !diceArray.every(die => die.value === diceArray[0].value)
    
    function allNewDice(){
        const newDice = new Array(10)
                .fill(0)
                .map(() => ({isHeld: false, 
                            id: nanoid(), 
                            value: Math.ceil(Math.random() * 6),
                            disabled: false}))
        return newDice
    }
    function handleRoll(){
        if(gameWon || gameLost){
            setMoveCount({usedMoves: 0, allowed: allowedMoves})
            setDiceArray(allNewDice())
        }
        else{
            setMoveCount(prevCount => ({...prevCount, usedMoves: prevCount.usedMoves + 1}))
            var newDiceArray = diceArray.map((obj) => ({...obj, value: obj.isHeld ? obj.value : Math.ceil(Math.random() * 6)}))
            if(moveCount.allowed <= moveCount.usedMoves + 1 && !newDiceArray.every(die => die.value === newDiceArray[0].value)){
                newDiceArray = newDiceArray.map(Dieobj => ({...Dieobj, disabled: true}))
                }
            setDiceArray(newDiceArray)
        }

    }
    function handleHold(id){
        setDiceArray(oldDice => {
            return oldDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            })
        })
    }
    const diceElement = diceArray.map((obj) => <Die 
                                                number={obj.value} 
                                                isHeld={obj.isHeld}
                                                hold={handleHold}
                                                key={obj.id}
                                                id={obj.id}
                                                disabled={obj.disabled}
                                                />)
    useEffect(() => {
        if(gameWon){
            buttonRef.current.focus()
        }
    }, [gameWon])
    return <main>
        <div className='container'>
            <div className='main-body'>
                <div>
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className='roll-count'>Rolls left: {moveCount.allowed - moveCount.usedMoves}</div>
                </div>
                <div className='dice-box'>
                    {diceElement}
                </div>
                <button ref={buttonRef} onClick={handleRoll} className='roll-button'>{(gameWon || gameLost) ? 'New Game' : 'Roll'}</button>
                {gameWon && <Confetti numberOfPieces={200}/>}
                <div aria-live='polite' className='sr-only'>
                    {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
                </div>
            </div>
        </div>
    </main>
}