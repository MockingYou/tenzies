import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  let incrementCounter = () => setCounter(counter + 1);
  
  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function allNewDice() {
    const newDice =[];
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false, 
      id: nanoid()
    }
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld}  holdDice={() => holdDice(die.id)} />)

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld  ? die : generateNewDie()
      })) 
      incrementCounter();   
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setCounter(0);
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <p className="instructions">You rolled the dice {counter} times </p>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
    </main>
  );
}

export default App;
