import "./spellsheet.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DiceMenu from "./components/diceMenu";
import { DialogType } from "./sheet";

function Spellsheet() {
  const [currDialogType, setCurrDialogType] = useState(null);
  const handleCurrDialogType = (e) => {
    setCurrDialogType(e.target.name);
  };

  const closeDialog = () => {
    setCurrDialogType(null);
  };

  const location = useLocation();

  const [spells, setspells] = useState({});

  const name = location.state.characterName;

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch(`/spellsheet/${name}`);
        const data = await response.json();
        if (response.ok) {
          setspells(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
        alert("An error occurred while fetching spellsheet.");
      }
    };
    fetchSpells();
  }, []);

  console.log(spells);

  function submithandlers() {
    fetch("/spellsheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spells),
    });
  }

  return (
    <div className="spellsheet">
      <h1>Spellsheet</h1>
      <div>
        <div className="Characterspecs">
          {location.state.characterName}
          <div className="spellcastingstats">
            <input
              value={spells.spellscastingability}
              onChange={(e) =>
                setspells({ ...spells, spellscastingability: e.target.value })
              }
              placeholder="16"
            ></input>
            <p>Spellcasting Ability</p>
          </div>
        </div>
        <div>
          <button name={DialogType.DiceMenu} onClick={handleCurrDialogType}>
            Dice Menu
          </button>
          <button onClick={submithandlers}>Save</button>
        </div>
        <h3>Cantrips</h3>
        <textarea
          value={spells.cantrip}
          onChange={(e) => setspells({ ...spells, cantrip: e.target.value })}
          placeholder="eldritch balst"
        ></textarea>
        <h3>1 Level Spells</h3>
        <textarea
          value={spells.lvl1spells}
          onChange={(e) => setspells({ ...spells, lvl1spells: e.target.value })}
          placeholder="acid splash"
        ></textarea>
        <h3>2 Level Spells</h3>
        <textarea
          value={spells.lvl2spells}
          onChange={(e) => setspells({ ...spells, lvl2spells: e.target.value })}
          placeholder="invisibility"
        ></textarea>
      </div>
      <div>
        <input
          value={spells.spellsavedc}
          onChange={(e) =>
            setspells({ ...spells, spellsavedc: e.target.value })
          }
          placeholder="18"
        ></input>
        <p>Spell Save DC</p>
        <h3>3 Level Spells</h3>
        <textarea
          value={spells.lvl3spells}
          onChange={(e) => setspells({ ...spells, lvl3spells: e.target.value })}
          placeholder="fireball"
        ></textarea>
        <h3>4 Level Spells</h3>
        <textarea
          value={spells.lvl4spells}
          onChange={(e) => setspells({ ...spells, lvl4spells: e.target.value })}
          placeholder="dimension door"
        ></textarea>
        <h3>5 Level Spells</h3>
        <textarea
          value={spells.lvl5spells}
          onChange={(e) => setspells({ ...spells, lvl5spells: e.target.value })}
          placeholder="telekinesis"
        ></textarea>
      </div>
      <div>
        <input
          value={spells.spellattackbonus}
          onChange={(e) =>
            setspells({ ...spells, spellattackbonus: e.target.value })
          }
          placeholder="+5"
        ></input>
        <p>Spell Attack Bonus</p>
        <h3>6 Level Spells</h3>
        <textarea
          value={spells.lvl6spells}
          onChange={(e) => setspells({ ...spells, lvl6spells: e.target.value })}
          placeholder="power word kill"
        ></textarea>
        <h3>7 Level Spells</h3>
        <textarea
          value={spells.lvl7spells}
          onChange={(e) => setspells({ ...spells, lvl7spells: e.target.value })}
          placeholder="power word blind"
        ></textarea>
        <h3>8 Level Spells</h3>
        <textarea
          value={spells.lvl8spells}
          onChange={(e) => setspells({ ...spells, lvl8spells: e.target.value })}
          placeholder="power word stun"
        ></textarea>
        <h3>9 Level Spells</h3>
        <textarea
          value={spells.lvl9spells}
          onChange={(e) => setspells({ ...spells, lvl9spells: e.target.value })}
          placeholder="wish"
        ></textarea>
      </div>
      <DiceMenu
        open={currDialogType == DialogType.DiceMenu}
        closeForm={closeDialog}
      />
    </div>
  );
}

export default Spellsheet;
