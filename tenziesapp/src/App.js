import logo from './logo.svg';
import './App.css';
import Die from './Die';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
function App() {
const [dice,setdice]=React.useState(allrolls())
const [tenzies, setTenzies] = React.useState(false)

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }
}, [dice])


  function allrolls(){
    const newdice=[];
    for(let i=0;i<10;i++)
    {
      newdice.push({value:Math.floor(Math.random()*9),
        isHeld:false,
        id:nanoid()})
    }
    return newdice;
  }

  function newgame(){
    setTenzies(false)
    setdice(allrolls())
  }


  function refreshdice(){
    setdice(olddice=>(olddice.map(die=>{
      return die.isHeld===true ?die 
      :{value:Math.floor(Math.random()*9),
         isHeld:false,
         id:nanoid()}
    })))
  }
  function hold(id){
    setdice(olddice=>(olddice.map(die=>{
      return die.id===id ? {...die,isHeld:true} : die
    })))
  }
  const dieelements=dice.map(die=>
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>hold(die.id)}/>
  )
  return (
    <main >
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='main-page'>
      {dieelements}
     {tenzies ?<button className='new-game' onClick={newgame}>new Game</button>: <button className='roll' onClick={refreshdice}>Roll dice!</button>}
      </div>
      
    </main>
  );
}

export default App;
