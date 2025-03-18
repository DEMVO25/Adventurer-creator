import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  DiceMenu,  { toggledialog} from "./dialogs";

function Sheet() {
  const navigate = useNavigate();
  const spellslots3 = 3;
  const spellslots2 = 2;
  const spellslots1 = 1;
  const spellslots4 = 4;

  const location = useLocation();

  const menuRef = useRef(null);
  
  const saveCheckbox = (event) => {
    const checkboxName = event.target.name;
    setcharacter({
      ...character,
      [checkboxName]: event.target.checked,
    });
  };

  const saveText = (event) => {
    const textName = event.target.name;
    setcharacter({ ...character, [textName]: event.target.value });
  };

  const saveNumber = (event) => {
    const numberName = event.target.name;
    const numberMax = parseInt(event.target.max);
    const numberMin = parseInt(event.target.min);
    setcharacter({
      ...character,
      [numberName]:
        event.target.value <= numberMax && event.target.value >= numberMin
          ? event.target.value
          : character[numberName],
    });
  };

  // [1, 0, 1, 1, 0] - 5 items
  // [0, 1, 2, 3, 4]
  // i = 3 true => false
  // [1, 0, 1, 0]
  // [1, 0, 1, 0, 0]

  // prices = [12, 12, 124, 124, 232]
  // [1, 2, 3, 3, 4]
  // splice(2, 2, prices[2] + prices[3])
  // [12, 12, 248, 232]

  const setCheckboxes = (event) => {
    const [spellName, i] = event.target.name.split("."); // spellslot1Checkbox.0 => array => [spellslot1Checkbox, 0]     // spe.ll.slot1Checkbox.0

    const newCheckboxes = [...character[spellName]];
    newCheckboxes.splice(i, 1, event.target.checked);

    setcharacter({
      ...character,
      [spellName]: newCheckboxes,
    });
  };

  const addCheckbox = (event) => {
    const spellName = event.target.name;
    setcharacter({
      ...character,
      [spellName]: [
        ...(character[spellName] ? character[spellName] : []),
        false,
      ],
    });
  };

  const deleteCheckbox = (event) => {
    const spellName = event.target.name;
    const deletedCheckboxs = [...character[spellName]];
    deletedCheckboxs.pop();
    setcharacter({ ...character, [spellName]: deletedCheckboxs });
  };

  const name = location.state.characterName;

  const [character, setcharacter] = useState({});

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/sheet/${name}`);
        const data = await response.json();
        if (response.ok) {
          setcharacter(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
        alert("An error occurred while fetching characters.");
      }
    };
    fetchCharacter();
  }, []);

  console.log(character);
  function submithandler() {
    fetch("/sheet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
    });
  }
  function submitspells() {
    navigate("/spellsheet", {
      state: { characterName: location.state.characterName },
    });
  }

  return (
    <div className="App">
      <div className="upper-body-box">
        <div className="Upper-body">
          <p>Adventurer name</p>
          {location.state.characterName}
          <p>Class & lvl's</p>
          <input
            type="text"
            placeholder=" Fighter 1 /Warlock 1"
            name="classlevel"
            value={character.classlevel}
            onChange={saveText}
            max={40}
          ></input>
          <p>Background</p>
          <input
            type="text"
            placeholder="Urchin"
            name="background"
            value={character.background}
            onChange={saveText}
            max={40}
          ></input>
        </div>
        <div className="Upper-body-lower">
          <p>Race</p>
          <input
            type="text"
            placeholder="Human"
            name="race"
            value={character.race}
            onChange={saveText}
            max={40}
          ></input>
          <p>Alignment</p>
          <input
            type="text"
            placeholder="Neutral Good"
            name="alignment"
            value={character.alignment}
            onChange={saveText}
            max={40}
          ></input>
          <p>Experience</p>
          <input
            type="number"
            name="experience"
            value={character.experience}
            min={0}
            max={355000}
            placeholder="0"
            onChange={saveNumber}
          ></input>
        </div>
        <div>
          <button onClick={submithandler}>Save</button>
          <button onClick={submitspells}>Spellsheet</button>
          <button onClick={()=>toggledialog(menuRef)}>Dice Menu</button>
          <DiceMenu menuRef={menuRef}></DiceMenu>
        </div>
      </div>

      <div className="middle-body">
        <div className="left-middle-body">
          <div className="statscolumn">
            <div className="strengthbox">
              <div className="strengthnumbers">
                <input
                  type="number"
                  placeholder="+2"
                  max={+7}
                  min={-1}
                  name="strengthmod"
                  value={character.strengthmod}
                  onChange={saveNumber}
                ></input>
                <input
                  type="number"
                  placeholder="15"
                  max={24}
                  min={1}
                  name="strengthnumber"
                  value={character.strengthnumber}
                  onChange={saveNumber}
                ></input>
                <p> Strength</p>
              </div>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+0"
                name="dexteritymod"
                value={character.dexteritymod}
                onChange={saveNumber}
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="10"
                name="dexteritynumber"
                value={character.dexteritynumber}
                onChange={saveNumber}
                max={20}
                min={1}
              ></input>
              <p> Dexterity</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+3"
                name="constitutionmod"
                value={character.constitutionmod}
                onChange={saveNumber}
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="16"
                name="constitutionnumber"
                value={character.constitutionnumber}
                onChange={saveNumber}
                max={20}
                min={1}
              ></input>
              <p> Constitution</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+1"
                name="intelligencemod"
                value={character.intelligencemod}
                onChange={saveNumber}
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="12"
                name="intelligencenumber"
                value={character.intelligencenumber}
                onChange={saveNumber}
                max={20}
                min={1}
              ></input>
              <p> Intelligence</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+2"
                name="wisdommod"
                value={character.wisdommod}
                onChange={saveNumber}
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="14"
                name="wisdomnumber"
                value={character.wisdomnumber}
                onChange={saveNumber}
                max={20}
                min={1}
              ></input>
              <p> Wisdom</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="-1"
                name="charismamod"
                value={character.charismamod}
                onChange={saveNumber}
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="8"
                name="charismanumber"
                value={character.charismanumber}
                onChange={saveNumber}
                max={20}
                min={1}
              ></input>
              <p> Charisma</p>
            </div>
          </div>
          <div>
            <div>
              <div className="inspiration-box">
                <input
                  type="number"
                  placeholder="0"
                  name="inspiration"
                  value={character.inspiration}
                  onChange={saveNumber}
                  min={0}
                  max={10}
                  className="inspiration-input"
                ></input>
                <p>INSPIRATION</p>
              </div>
              <div className="inspiration-box">
                <input
                  type="number"
                  placeholder="+2"
                  name="proficiencybonus"
                  value={character.proficiencybonus}
                  onChange={saveNumber}
                  min={+2}
                  max={+20}
                  className="inspiration-input"
                ></input>
                <p>PROFICIENCY BONUS</p>
              </div>
              <div className="savingthrowline">
                <input
                  checked={character.strstcheck}
                  name="strstcheck"
                  onChange={saveCheckbox}
                  type="checkbox"
                  defaultChecked
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="strengthsavingthrow"
                  value={character.strengthsavingthrow}
                  onChange={saveNumber}
                  placeholder="+4"
                  min={-1}
                  max={+20}
                ></input>
                <p>Strength</p>
              </div>
              <div className="savingthrowline">
                <input
                  name="dexstcheck"
                  checked={character.dexstcheck}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="dexteritysavingthrow"
                  value={character.dexteritysavingthrow}
                  onChange={saveNumber}
                  placeholder="+0"
                  min={-1}
                  max={+20}
                ></input>
                <p>Dexterity</p>
              </div>
              <div className="savingthrowline">
                <input
                  name="constcheck"
                  checked={character.constcheck}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="constitutionsavingthrow"
                  value={character.constitutionsavingthrow}
                  onChange={saveNumber}
                  placeholder="+5"
                  min={-1}
                  max={+20}
                ></input>
                <p>Constitution</p>
              </div>
              <div className="savingthrowline">
                <input
                  name="intstcheck"
                  checked={character.intstcheck}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="intelligencesavingthrow"
                  value={character.intelligencesavingthrow}
                  onChange={saveNumber}
                  placeholder="+1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Intelligence</p>
              </div>
              <div className="savingthrowline">
                <input
                  name="wisstcheck"
                  checked={character.wisstcheck}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="wisdomsavingthrow"
                  value={character.wisdomsavingthrow}
                  onChange={saveNumber}
                  placeholder="+2"
                  min={-1}
                  max={+20}
                ></input>
                <p>Wisdom</p>
              </div>
              <div className="savingthrowline">
                <input
                  name="charstcheck"
                  checked={character.chastcheck}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="charismasavingthrow"
                  value={character.charismasavingthrow}
                  onChange={saveNumber}
                  placeholder="-1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Charisma</p>
              </div>
              <p>SAVING THROWS</p>
            </div>

            <div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="acrobaticscheck"
                  checked={character.acrobaticscheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="acrobatics"
                  value={character.acrobatics}
                  onChange={saveNumber}
                  placeholder="-1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Acrobatics (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="animalhandlingcheck"
                  checked={character.animalhandlingcheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="animalhandling"
                  value={character.animalhandling}
                  onChange={saveNumber}
                  placeholder="+2"
                  min={-1}
                  max={+20}
                ></input>
                <p>Animal Handling (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="arcanacheck"
                  checked={character.arcanacheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="arcana"
                  value={character.arcana}
                  onChange={saveNumber}
                  placeholder="+1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Arcana (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="athleticscheck"
                  checked={character.athleticscheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="athletics"
                  value={character.athletics}
                  onChange={saveNumber}
                  placeholder="+2"
                  min={-1}
                  max={+20}
                ></input>
                <p>Athletics (Str)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="deceptioncheck"
                  checked={character.deceptioncheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="deception"
                  value={character.deception}
                  onChange={saveNumber}
                  placeholder="-1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Deception (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="historycheck"
                  checked={character.historycheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="history"
                  value={character.history}
                  onChange={saveNumber}
                  placeholder="+1"
                  min={-1}
                  max={+20}
                ></input>
                <p>History (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="insightcheck"
                  checked={character.insightcheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="insight"
                  value={character.insight}
                  onChange={saveNumber}
                  placeholder="+2"
                  min={-1}
                  max={+20}
                ></input>
                <p>Insight (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="intimidationcheck"
                  checked={character.intimidationcheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="intimidation"
                  value={character.intimidation}
                  onChange={saveNumber}
                  placeholder="-1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Intimidation (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="investigationcheck"
                  checked={character.investigationcheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="investigation"
                  value={character.investigation}
                  onChange={saveNumber}
                  placeholder="+1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Investigation (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="medicinecheck"
                  checked={character.medicinecheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  value={character.medicine}
                  onChange={saveNumber}
                  name="medicine"
                  min={-1}
                  max={+20}
                  placeholder="+2"
                ></input>
                <p>Medicine (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="naturecheck"
                  checked={character.naturecheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="nature"
                  value={character.nature}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="+1"
                ></input>
                <p>Nature (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="perceptioncheck"
                  checked={character.perceptioncheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="perception"
                  value={character.perception}
                  onChange={saveNumber}
                  placeholder="+2"
                  min={-1}
                  max={+20}
                ></input>
                <p>Perception (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="perfomancecheck"
                  checked={character.perfomancecheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="perfomance"
                  value={character.perfomance}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="-1"
                ></input>
                <p>Performance (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="persuasioncheck"
                  checked={character.persuasioncheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="persuasion"
                  value={character.persuasion}
                  onChange={saveNumber}
                  placeholder="-1"
                  min={-1}
                  max={+20}
                ></input>
                <p>Persuasion (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="religioncheck"
                  checked={character.religioncheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="religion"
                  value={character.religion}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="+1"
                ></input>
                <p>Religion (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="sleightofhandscheck"
                  checked={character.sleightofhandscheck}
                  onChange={saveCheckbox}
                  defaultChecked
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="sleightofhands"
                  value={character.sleightofhands}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="+2"
                ></input>
                <p>Sleight of Hand (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="stealthcheck"
                  checked={character.stealthcheck}
                  onChange={saveCheckbox}
                  defaultChecked
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="stealth"
                  value={character.stealth}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="+2"
                ></input>
                <p>Stealth (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  name="survivalcheck"
                  checked={character.survivalcheck}
                  onChange={saveCheckbox}
                ></input>
                <input
                  type="number"
                  className="saving-throw-number"
                  name="survival"
                  value={character.survival}
                  onChange={saveNumber}
                  min={-1}
                  max={+20}
                  placeholder="+2"
                ></input>
                <p>Survival (Wis)</p>
              </div>
              <p>SKILLS</p>
            </div>
            <div className="passive-wisdom-box">
              <input
                type="number"
                name="passivewisdom"
                value={character.passivewisdom}
                onChange={saveNumber}
                max={20}
                min={-1}
                placeholder="0"
                className="passive-wisdom-input"
              ></input>
              <p>PASSIVE WISDOM (PERCEPTION)</p>
            </div>
            <div>
              <textarea
                className="proficiencies-textarea"
                name="proficienciestextarea"
                value={character.proficienciestextarea}
                onChange={saveText}
                placeholder="Armor: All armor, shields.
Weapons: Simple weapons, martial weapons.
Tools: None."
              ></textarea>
              <p>OTHER PROFICIENCIES & LANGUAGES</p>
            </div>
          </div>
        </div>

        <div className="Hitpointsbox">
          <div className="arm-init-spd-box">
            <div className="armorbox">
              <input
                type="number"
                placeholder="14"
                name="armor"
                value={character.armor}
                onChange={saveNumber}
                min={9}
                max={50}
              ></input>
              <p>Armor class</p>
            </div>
            <div className="armorbox">
              <input
                type="number"
                name="initiative"
                value={character.initiative}
                onChange={saveNumber}
                min={-1}
                max={20}
                placeholder="0"
              ></input>
              <p>Initiative</p>
            </div>
            <div className="armorbox">
              <input
                type="number"
                name="speed"
                value={character.speed}
                onChange={saveNumber}
                min={0}
                max={150}
                placeholder="30"
              ></input>
              <p>Speed</p>
            </div>
          </div>
          <p>CURRENT HIT POINTS</p>
          <textarea
            placeholder="Hit Point Maximum  13"
            name="currenthitpoints"
            value={character.currenthitpoints}
            onChange={saveText}
          ></textarea>
          <p>TEMPORARY HIT POINTS</p>
          <textarea
            placeholder="1"
            name="temporaryhitpoints"
            value={character.temporaryhitpoints}
            onChange={saveText}
          ></textarea>
          <div className="hit-dice-box">
            <div>
              <p>HIT DICE</p>
              <textarea
                className="hit-dice-textarea"
                name="hitdice"
                value={character.hitdice}
                onChange={saveText}
                placeholder="Total 1d10 + 3"
              ></textarea>
            </div>
            <div className="death-saves-box">
              <p>DEATH SAVES</p>
              <div className="deathcheckboxes">
                <p>SUCCESSES</p>
                <input
                  name="succes1"
                  checked={character.succes1}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  name="succes2"
                  checked={character.succes2}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  name="succes3"
                  checked={character.succes3}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
              </div>
              <div className="deathcheckboxes">
                <p>FAILURES</p>
                <input
                  name="fail1"
                  checked={character.fail1}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  name="fail2"
                  checked={character.fail2}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
                <input
                  name="fail3"
                  checked={character.fail3}
                  onChange={saveCheckbox}
                  type="checkbox"
                ></input>
              </div>
            </div>
          </div>
          <div>
            <table>
              <tr>
                <th>NAME</th>
                <th>ATK BONUS</th>
                <th>DAMAGE/TYPE</th>
              </tr>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Rapier"
                    name="weapon1"
                    value={character.weapon1}
                    onChange={saveText}
                  ></input>
                </th>
                <th>
                  <input
                    type="number"
                    placeholder="+2"
                    name="atkbonus1"
                    value={character.atkbonus1}
                    onChange={saveNumber}
                    min={-2}
                    max={30}
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="1d8 + 0, Piercing"
                    name="dmg1"
                    value={character.dmg1}
                    onChange={saveText}
                  ></input>
                </th>
              </tr>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Heavy Crossbow"
                    name="weapon2"
                    value={character.weapon2}
                    onChange={saveText}
                  ></input>
                </th>
                <th>
                  <input
                    type="number"
                    placeholder="+2"
                    name="atkbonus2"
                    value={character.atkbonus2}
                    onChange={saveNumber}
                    min={-2}
                    max={30}
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="1d10 + 0, Piercing"
                    name="dmg2"
                    value={character.dmg2}
                    onChange={saveText}
                  ></input>
                </th>
              </tr>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Longsword"
                    name="weapon3"
                    value={character.weapon3}
                    onChange={saveText}
                  ></input>
                </th>
                <th>
                  <input
                    type="number"
                    placeholder="+4"
                    name="atkbonus3"
                    value={character.atkbonus3}
                    onChange={saveNumber}
                    min={-2}
                    max={30}
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="1d8/1d10 + 4, Slashing"
                    id="dmg3"
                    value={character.dmg3}
                    onChange={(e) =>
                      setcharacter({ ...character, dmg3: e.target.value })
                    }
                  ></input>
                </th>
              </tr>
            </table>
          </div>
          <div className="equipmentbox">
            <div className="coinsboxbody">
              <div className="coinsbox">
                <p>CP</p>
                <input
                  type="number"
                  placeholder="0"
                  value={character.cp}
                  onChange={(e) =>
                    setcharacter({ ...character, cp: e.target.value })
                  }
                  className="coinsinput"
                ></input>
              </div>
              <div className="coinsbox">
                <p>SP</p>
                <input
                  type="number"
                  placeholder="0"
                  value={character.sp}
                  onChange={(e) =>
                    setcharacter({ ...character, sp: e.target.value })
                  }
                  className="coinsinput"
                ></input>
              </div>
              <div className="coinsbox">
                <p>EP</p>
                <input
                  type="number"
                  placeholder="0"
                  value={character.ep}
                  onChange={(e) =>
                    setcharacter({ ...character, ep: e.target.value })
                  }
                  className="coinsinput"
                ></input>
              </div>
              <div className="coinsbox">
                <p>GP</p>
                <input
                  type="number"
                  placeholder="0"
                  value={character.gp}
                  onChange={(e) =>
                    setcharacter({ ...character, gp: e.target.value })
                  }
                  className="coinsinput"
                ></input>
              </div>
              <div className="coinsbox">
                <p>PP</p>
                <input
                  type="number"
                  placeholder="0"
                  value={character.pp}
                  onChange={(e) =>
                    setcharacter({ ...character, pp: e.target.value })
                  }
                  className="coinsinput"
                ></input>
              </div>
            </div>

            <div>
              <textarea
                className="equipment-textarea"
                value={character.equipmenttextarea}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    equipmenttextarea: e.target.value,
                  })
                }
                placeholder="Set of common clothes"
              ></textarea>
              <p>EQUIPMENT</p>
            </div>
          </div>
          <div className="spell-slots-box">
            <div id="spellslots-1lvl-container">
              {character.spellslot1Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot1Checkbox.${i}`} // spellslot1Checkbox.0, spellslot1Checkbox.1
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot1Checkbox?.length > 0 && (
                <button name="spellslot1Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot1Checkbox ||
                character.spellslot1Checkbox.length < spellslots4) && (
                <button name="spellslot1Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>
            <div>
              {character.spellslot2Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot2Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot2Checkbox?.length > 0 && (
                <button name="spellslot2Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot2Checkbox ||
                character.spellslot2Checkbox.length < spellslots3) && (
                <button name="spellslot2Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot3Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot3Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot3Checkbox?.length > 0 && (
                <button name="spellslot3Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot3Checkbox ||
                character.spellslot3Checkbox.length < spellslots3) && (
                <button name="spellslot3Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot4Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot4Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot4Checkbox?.length > 0 && (
                <button name="spellslot4Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot4Checkbox ||
                character.spellslot4Checkbox.length < spellslots3) && (
                <button name="spellslot4Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot5Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot5Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot5Checkbox?.length > 0 && (
                <button name="spellslot5Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot5Checkbox ||
                character.spellslot5Checkbox.length < spellslots3) && (
                <button name="spellslot5Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot6Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot6Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot6Checkbox?.length > 0 && (
                <button name="spellslot6Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot6Checkbox ||
                character.spellslot6Checkbox.length < spellslots2) && (
                <button name="spellslot6Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot7Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot7Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot7Checkbox?.length > 0 && (
                <button name="spellslot7Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot7Checkbox ||
                character.spellslot7Checkbox.length < spellslots2) && (
                <button name="spellslot7Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot8Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot8Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot8Checkbox?.length > 0 && (
                <button name="spellslot8Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot8Checkbox ||
                character.spellslot8Checkbox.length < spellslots1) && (
                <button name="spellslot8Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <div>
              {character.spellslot9Checkbox?.map((x, i) => {
                return (
                  <input
                    type="checkbox"
                    name={`spellslot9Checkbox.${i}`}
                    checked={x}
                    onChange={setCheckboxes}
                  ></input>
                );
              })}

              {character.spellslot9Checkbox?.length > 0 && (
                <button name="spellslot9Checkbox" onClick={deleteCheckbox}>
                  -
                </button>
              )}

              {(!character.spellslot9Checkbox ||
                character.spellslot9Checkbox.length < spellslots1) && (
                <button name="spellslot9Checkbox" onClick={addCheckbox}>
                  +
                </button>
              )}
            </div>

            <p>SPELL SLOTS</p>
          </div>
        </div>
        <div>
          <div>
            <textarea
              placeholder="I ask a lot of questions"
              value={character.personality}
              onChange={(e) =>
                setcharacter({ ...character, personality: e.target.value })
              }
              className="personality-textarea"
            ></textarea>
            <p>PERSONALITY TRAITS</p>
          </div>
          <div>
            <textarea
              placeholder=" All people, rich or poor, deserve respect"
              value={character.ideals}
              onChange={(e) =>
                setcharacter({ ...character, ideals: e.target.value })
              }
              className="personality-textarea"
            ></textarea>
            <p>IDEALS</p>
          </div>
          <div>
            <textarea
              placeholder="No one else should have to endure the hardships I have been through"
              value={character.bonds}
              onChange={(e) =>
                setcharacter({ ...character, bonds: e.target.value })
              }
              className="personality-textarea"
            ></textarea>
            <p>BONDS</p>
          </div>
          <div>
            <textarea
              placeholder="If I am outnumbered, I will run away from a fight."
              value={character.flaws}
              onChange={(e) =>
                setcharacter({ ...character, flaws: e.target.value })
              }
              className="personality-textarea"
            ></textarea>
            <p>FLAWS</p>
          </div>
          <div>
            <textarea className="features-textarea"></textarea>
            <p>FEATURES & TRAITS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sheet;
