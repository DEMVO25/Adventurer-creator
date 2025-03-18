import { useRef, useState } from "react";
import "./dialogs.css";
const D4 = 4;
const D6 = 6;
const D8 = 8;
const D10 = 10;
const D12 = 12;
const D20 = 20;
const maxDicenumber = 20;

function rollDice(Dice) {
  return Math.floor(Math.random() * Dice) + 1;
}

export function toggledialog(dialog) {
  if (dialog.current) {
    dialog.current.hasAttribute("open")
      ? dialog.current.close()
      : dialog.current.showModal();
  }
}

function DiceMenu({ menuRef }) {
  const [diceNumber, setDiceNumber] = useState([]);
  const [diceNumber1, setDiceNumber1] = useState([]);
  const [diceNumber2, setDiceNumber2] = useState([]);
  const [diceNumber3, setDiceNumber3] = useState([]);
  const [diceNumber4, setDiceNumber4] = useState([]);
  const [diceNumber5, setDiceNumber5] = useState([]);
  
  return (
    <dialog ref={menuRef} className="diceMenu">
      <div>
        <h2>Dice Menu</h2>
        <div>
          <button
            onClick={() => {
              diceNumber1.length < maxDicenumber &&
                setDiceNumber1([...diceNumber1, rollDice(D4)]);
            }}
          >
            D4
          </button>
          <output>{diceNumber1.toString()}</output>
          <button onClick={() => setDiceNumber1([])}>Delete</button>
        </div>
        <div>
          <button
            onClick={() => {
              diceNumber.length < maxDicenumber &&
                setDiceNumber([...diceNumber, rollDice(D6)]);
            }}
          >
            D6
          </button>
          <output>{diceNumber.toString()}</output>
          <button onClick={() => setDiceNumber([])}>Delete</button>
        </div>
        <div>
          <button
            onClick={() => {
              diceNumber2.length < maxDicenumber &&
                setDiceNumber2([...diceNumber2, rollDice(D8)]);
            }}
          >
            D8
          </button>
          <output>{diceNumber2.toString()}</output>
          <button onClick={() => setDiceNumber2([])}>Delete</button>
        </div>
        <div>
          <button
            onClick={() => {
              diceNumber3.length < maxDicenumber &&
                setDiceNumber3([...diceNumber3, rollDice(D10)]);
            }}
          >
            D10
          </button>
          <output>{diceNumber3.toString()}</output>
          <button onClick={() => setDiceNumber3([])}>Delete</button>
        </div>
        <div>
          <button
            onClick={() => {
              diceNumber4.length < maxDicenumber &&
                setDiceNumber4([...diceNumber4, rollDice(D12)]);
            }}
          >
            D12
          </button>
          <output>{diceNumber4.toString()}</output>
          <button onClick={() => setDiceNumber4([])}>Delete</button>
        </div>
        <div>
          <button
            onClick={() => {
              diceNumber5.length < maxDicenumber &&
                setDiceNumber5([...diceNumber5, rollDice(D20)]);
            }}
          >
            D20
          </button>
          <output>{diceNumber5.toString()}</output>
          <button onClick={() => setDiceNumber5([])}>Delete</button>
        </div>
        
      </div>
    </dialog>
  );
}

export default DiceMenu;
