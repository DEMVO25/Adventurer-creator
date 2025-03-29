import { useState } from "react";
import "./diceMenu.css";
import Dialog from "../dialog";

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

function DiceMenu({ open, closeForm }) {
  const [diceRolls, setDiceRolls] = useState({});
  const diceTypes = [4, 6, 8, 10, 12, 20]; // Define available dice types

  const addDiceRoll = (sides) => {
    setDiceRolls((prevRolls) => ({
      ...prevRolls,
      [sides]: [...(prevRolls[sides] || []), rollDice(sides)], // Append new roll
    }));
  };

  const clearDiceRolls = (sides) => {
    setDiceRolls((prevRolls) => ({
      ...prevRolls,
      [sides]: [], // Clear rolls for this type
    }));
  };

  return (
    <Dialog open={open} closeForm={closeForm} title="Dice Menu">
      <div>
        <div>
          {/* Dice Type Buttons */}
          {diceTypes.map((sides) => (
            <div key={sides}>
              {(!diceRolls[sides] || diceRolls[sides].length < 20) && (
                <button onClick={() => addDiceRoll(sides)}>
                  Roll D{sides}
                </button>
              )}

              <output>{(diceRolls[sides] || []).join(", ")}</output>
              <button onClick={() => clearDiceRolls(sides)}>
                Clear D{sides}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default DiceMenu;
