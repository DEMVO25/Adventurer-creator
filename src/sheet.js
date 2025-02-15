import { useEffect, useState } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sheet() {
  const navigate = useNavigate();

  const location = useLocation();
  const [checkbox, setcheckbox] = useState(false);
  const [checkboxCount, setCheckboxCount] = useState(0);

  const [checkbox1, setcheckbox1] = useState(false);
  const [checkboxCount1, setCheckboxCount1] = useState(0);

  const [checkbox2, setcheckbox2] = useState(false);
  const [checkboxCount2, setCheckboxCount2] = useState(0);

  const [checkbox3, setcheckbox3] = useState(false);
  const [checkboxCount3, setCheckboxCount3] = useState(0);

  const [checkbox4, setcheckbox4] = useState(false);
  const [checkboxCount4, setCheckboxCount4] = useState(0);

  const [checkbox5, setcheckbox5] = useState(false);
  const [checkboxCount5, setCheckboxCount5] = useState(0);

  const [checkbox6, setcheckbox6] = useState(false);
  const [checkboxCount6, setCheckboxCount6] = useState(0);

  const [checkbox7, setcheckbox7] = useState(false);
  const [checkboxCount7, setCheckboxCount7] = useState(0);

  const [checkbox8, setcheckbox8] = useState(false);
  const [checkboxCount8, setCheckboxCount8] = useState(0);

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
            id="class%lvl"
            value={character.classlevel}
            onChange={(e) =>
              setcharacter({ ...character, classlevel: e.target.value })
            }
            max={40}
          ></input>
          <p>Background</p>
          <input
            type="text"
            placeholder="Urchin"
            id="background"
            value={character.background}
            onChange={(e) =>
              setcharacter({ ...character, background: e.target.value })
            }
            max={40}
          ></input>
        </div>
        <div className="Upper-body-lower">
          <p>Race</p>
          <input
            type="text"
            placeholder="Human"
            id="race"
            value={character.race}
            onChange={(e) =>
              setcharacter({ ...character, race: e.target.value })
            }
            max={40}
          ></input>
          <p>Alignment</p>
          <input
            type="text"
            placeholder="Neutral Good"
            id="alignment"
            value={character.alignment}
            onChange={(e) =>
              setcharacter({ ...character, alignment: e.target.value })
            }
            max={40}
          ></input>
          <p>Experience</p>
          <input
            type="number"
            id="experience"
            value={character.experience}
            placeholder="0"
            onChange={(e) =>
              setcharacter({ ...character, experience: e.target.value })
            }
            min={0}
            max={355000}
          ></input>
        </div>
        <div>
          <button onClick={submithandler}>Save</button>
          <button onClick={submitspells}>Spellsheet</button>
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
                  id="strengthmod"
                  value={character.strengthmod}
                  onChange={(e) =>
                    setcharacter({ ...character, strengthmod: e.target.value })
                  }
                ></input>
                <input
                  type="number"
                  placeholder="15"
                  max={24}
                  min={1}
                  id="strengthnumber"
                  value={character.strengthnumber}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      strengthnumber: e.target.value,
                    })
                  }
                ></input>
                <p> Strength</p>
              </div>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+0"
                id="dexteritymod"
                value={character.dexteritymod}
                onChange={(e) =>
                  setcharacter({ ...character, dexteritymod: e.target.value })
                }
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="10"
                id="dexteritynumber"
                value={character.dexteritynumber}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    dexteritynumber: e.target.value,
                  })
                }
                max={20}
                min={1}
              ></input>
              <p> Dexterity</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+3"
                id="constitutionmod"
                value={character.constitutionmod}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    constitutionmod: e.target.value,
                  })
                }
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="16"
                id="constitutionnumber"
                value={character.constitutionnumber}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    constitutionnumber: e.target.value,
                  })
                }
                max={20}
                min={1}
              ></input>
              <p> Constitution</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+1"
                id="intelligencemod"
                value={character.intelligencemod}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    intelligencemod: e.target.value,
                  })
                }
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="12"
                id="intelligencenumber"
                value={character.intelligencenumber}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    intelligencenumber: e.target.value,
                  })
                }
                max={20}
                min={1}
              ></input>
              <p> Intelligence</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="+2"
                id="wisdommod"
                value={character.wisdommod}
                onChange={(e) =>
                  setcharacter({ ...character, wisdommod: e.target.value })
                }
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="14"
                id="wisdomnumber"
                value={character.wisdomnumber}
                onChange={(e) =>
                  setcharacter({ ...character, wisdomnumber: e.target.value })
                }
                max={20}
                min={1}
              ></input>
              <p> Wisdom</p>
            </div>
            <div className="strengthnumbers">
              <input
                type="number"
                placeholder="-1"
                id="charismamod"
                value={character.charismamod}
                onChange={(e) =>
                  setcharacter({ ...character, charismamod: e.target.value })
                }
                max={+5}
                min={-1}
              ></input>
              <input
                type="number"
                placeholder="8"
                id="charismanumber"
                value={character.charismanumber}
                onChange={(e) =>
                  setcharacter({ ...character, charismanumber: e.target.value })
                }
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
                  id="inspiration"
                  value={character.inspiration}
                  onChange={(e) =>
                    setcharacter({ ...character, inspiration: e.target.value })
                  }
                  className="inspiration-input"
                ></input>
                <p>INSPIRATION</p>
              </div>
              <div className="inspiration-box">
                <input
                  type="text"
                  placeholder="+2"
                  id="proficiencybonus"
                  value={character.proficiencybonus}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      proficiencybonus: e.target.value,
                    })
                  }
                  className="inspiration-input"
                ></input>
                <p>PROFICIENCY BONUS</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox" defaultChecked></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="strengthsavingthrow"
                  value={character.strengthsavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      strengthsavingthrow: e.target.value,
                    })
                  }
                  placeholder="+4"
                ></input>
                <p>Strength</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox"></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="dexteritysavingthrow"
                  value={character.dexteritysavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      dexteritysavingthrow: e.target.value,
                    })
                  }
                  placeholder="+0"
                ></input>
                <p>Dexterity</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox" defaultChecked></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="constitutionsavingthrow"
                  value={character.constitutionsavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      constitutionsavingthrow: e.target.value,
                    })
                  }
                  placeholder="+5"
                ></input>
                <p>Constitution</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox"></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="intelligencesavingthrow"
                  value={character.intelligencesavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      intelligencesavingthrow: e.target.value,
                    })
                  }
                  placeholder="+1"
                ></input>
                <p>Intelligence</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox"></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="wisdomsavingthrow"
                  value={character.wisdomsavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      wisdomsavingthrow: e.target.value,
                    })
                  }
                  placeholder="+2"
                ></input>
                <p>Wisdom</p>
              </div>
              <div className="savingthrowline">
                <input type="checkbox"></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="charismasavingthrow"
                  value={character.charismasavingthrow}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      charismasavingthrow: e.target.value,
                    })
                  }
                  placeholder="-1"
                ></input>
                <p>Charisma</p>
              </div>
              <p>SAVING THROWS</p>
            </div>

            <div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="acrobaticscheck"
                  checked={character.acrobaticscheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      acrobaticscheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="acrobatics"
                  value={character.acrobatics}
                  onChange={(e) =>
                    setcharacter({ ...character, acrobatics: e.target.value })
                  }
                  placeholder="-1"
                ></input>
                <p>Acrobatics (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="animalhandlingcheck"
                  checked={character.animalhandlingcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      animalhandlingcheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="animalhandling"
                  value={character.animalhandling}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      animalhandling: e.target.value,
                    })
                  }
                  placeholder="+2"
                ></input>
                <p>Animal Handling (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="arcanacheck"
                  checked={character.arcanacheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      arcanacheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="arcana"
                  value={character.arcana}
                  onChange={(e) =>
                    setcharacter({ ...character, arcana: e.target.value })
                  }
                  placeholder="+1"
                ></input>
                <p>Arcana (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="athleticscheck"
                  checked={character.athleticscheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      athleticscheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="athletics"
                  value={character.athletics}
                  onChange={(e) =>
                    setcharacter({ ...character, athletics: e.target.value })
                  }
                  placeholder="+2"
                ></input>
                <p>Athletics (Str)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="deceptioncheck"
                  checked={character.deceptioncheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      deceptioncheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="deception"
                  value={character.deception}
                  onChange={(e) =>
                    setcharacter({ ...character, deception: e.target.value })
                  }
                  placeholder="-1"
                ></input>
                <p>Deception (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="historycheck"
                  checked={character.historycheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      historycheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="history"
                  value={character.history}
                  onChange={(e) =>
                    setcharacter({ ...character, history: e.target.value })
                  }
                  placeholder="+1"
                ></input>
                <p>History (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="insightcheck"
                  checked={character.insightcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      insightcheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="insight"
                  value={character.insight}
                  onChange={(e) =>
                    setcharacter({ ...character, insight: e.target.value })
                  }
                  placeholder="+2"
                ></input>
                <p>Insight (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="intimidationcheck"
                  checked={character.intimidationcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      intimidationcheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="intimidation"
                  value={character.intimidation}
                  onChange={(e) =>
                    setcharacter({ ...character, intimidation: e.target.value })
                  }
                  placeholder="-1"
                ></input>
                <p>Intimidation (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="investigationcheck"
                  checked={character.investigationcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      investigationcheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="investigation"
                  value={character.investigation}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      investigation: e.target.value,
                    })
                  }
                  placeholder="+1"
                ></input>
                <p>Investigation (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="medicinecheck"
                  checked={character.medicinecheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      medicinecheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  value={character.medicine}
                  onChange={(e) =>
                    setcharacter({ ...character, medicine: e.target.value })
                  }
                  id="medicine"
                  placeholder="+2"
                ></input>
                <p>Medicine (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="naturecheck"
                  checked={character.naturecheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      naturecheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="nature"
                  value={character.nature}
                  onChange={(e) =>
                    setcharacter({ ...character, nature: e.target.value })
                  }
                  placeholder="+1"
                ></input>
                <p>Nature (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="perceptioncheck"
                  checked={character.perceptioncheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      perceptioncheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="perception"
                  value={character.perception}
                  onChange={(e) =>
                    setcharacter({ ...character, perception: e.target.value })
                  }
                  placeholder="+2"
                ></input>
                <p>Perception (Wis)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="perfomancecheck"
                  checked={character.perfomancecheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      perfomancecheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="perfomance"
                  value={character.perfomancecheck}
                  onChange={(e) =>
                    setcharacter({ ...character, perfomance: e.target.value })
                  }
                  placeholder="-1"
                ></input>
                <p>Performance (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="persuasioncheck"
                  checked={character.persuasioncheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      persuasioncheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="persuasion"
                  value={character.persuasion}
                  onChange={(e) =>
                    setcharacter({ ...character, persuasion: e.target.value })
                  }
                  placeholder="-1"
                ></input>
                <p>Persuasion (Cha)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="religioncheck"
                  checked={character.religioncheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      religioncheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="religion"
                  value={character.religion}
                  onChange={(e) =>
                    setcharacter({ ...character, religion: e.target.value })
                  }
                  placeholder="+1"
                ></input>
                <p>Religion (Int)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="sleightofhandscheck"
                  checked={character.sleightofhandscheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      sleightofhandscheck: e.target.checked,
                    })
                  }
                  defaultChecked
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="sleightofhands"
                  value={character.sleightofhands}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      sleightofhands: e.target.value,
                    })
                  }
                  placeholder="+2"
                ></input>
                <p>Sleight of Hand (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="stealthcheck"
                  checked={character.stealthcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      stealthcheck: e.target.checked,
                    })
                  }
                  defaultChecked
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="stealth"
                  value={character.stealth}
                  onChange={(e) =>
                    setcharacter({ ...character, stealth: e.target.value })
                  }
                  placeholder="+2"
                ></input>
                <p>Stealth (Dex)</p>
              </div>
              <div className="savingthrowline">
                <input
                  type="checkbox"
                  id="survivalcheck"
                  checked={character.survivalcheck}
                  onChange={(e) =>
                    setcharacter({
                      ...character,
                      survivalcheck: e.target.checked,
                    })
                  }
                ></input>
                <input
                  type="text"
                  className="saving-throw-number"
                  id="survival"
                  value={character.survival}
                  onChange={(e) =>
                    setcharacter({ ...character, survival: e.target.value })
                  }
                  placeholder="+2"
                ></input>
                <p>Survival (Wis)</p>
              </div>
              <p>SKILLS</p>
            </div>
            <div className="passive-wisdom-box">
              <input
                type="number"
                id="passivewisdom"
                value={character.passivewisdom}
                onChange={(e) =>
                  setcharacter({ ...character, passivewisdom: e.target.value })
                }
                max={20}
                className="passive-wisdom-input"
              ></input>
              <p>PASSIVE WISDOM (PERCEPTION)</p>
            </div>
            <div>
              <textarea
                className="proficiencies-textarea"
                id="proficienciestextarea"
                value={character.proficienciestextarea}
                onChange={(e) =>
                  setcharacter({
                    ...character,
                    proficienciestextarea: e.target.value,
                  })
                }
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
                id="armor"
                value={character.armor}
                onChange={(e) =>
                  setcharacter({ ...character, armor: e.target.value })
                }
              ></input>
              <p>Armor class</p>
            </div>
            <div className="armorbox">
              <input
                type="number"
                id="initiative"
                value={character.initiative}
                onChange={(e) =>
                  setcharacter({ ...character, initiative: e.target.value })
                }
                placeholder="0"
              ></input>
              <p>Initiative</p>
            </div>
            <div className="armorbox">
              <input
                type="number"
                id="speed"
                value={character.speed}
                onChange={(e) =>
                  setcharacter({ ...character, speed: e.target.value })
                }
                placeholder="30"
              ></input>
              <p>Speed</p>
            </div>
          </div>
          <p>CURRENT HIT POINTS</p>
          <textarea
            placeholder="Hit Point Maximum  13"
            id="currenthitpoints"
            value={character.currenthitpoints}
            onChange={(e) =>
              setcharacter({ ...character, currenthitpoints: e.target.value })
            }
          ></textarea>
          <p>TEMPORARY HIT POINTS</p>
          <textarea
            placeholder="1"
            id="temporaryhitpoints"
            value={character.temporaryhitpoints}
            onChange={(e) =>
              setcharacter({ ...character, temporaryhitpoints: e.target.value })
            }
          ></textarea>
          <div className="hit-dice-box">
            <div>
              <p>HIT DICE</p>
              <textarea
                className="hit-dice-textarea"
                id="hitdice"
                value={character.hitdice}
                onChange={(e) =>
                  setcharacter({ ...character, hitdice: e.target.value })
                }
                placeholder="Total 1d10 + 3"
              ></textarea>
            </div>
            <div className="death-saves-box">
              <p>DEATH SAVES</p>
              <div className="deathcheckboxes">
                <p>SUCCESSES</p>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
              </div>
              <div className="deathcheckboxes">
                <p>FAILURES</p>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
                <input type="checkbox"></input>
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
                    id="weapon1"
                    value={character.weapon1}
                    onChange={(e) =>
                      setcharacter({ ...character, weapon1: e.target.value })
                    }
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="+2"
                    id="atkbonus1"
                    value={character.atkbonus1}
                    onChange={(e) =>
                      setcharacter({ ...character, atkbonus1: e.target.value })
                    }
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="1d8 + 0, Piercing"
                    id="dmg1"
                    value={character.dmg1}
                    onChange={(e) =>
                      setcharacter({ ...character, dmg1: e.target.value })
                    }
                  ></input>
                </th>
              </tr>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Heavy Crossbow"
                    id="weapon2"
                    value={character.weapon2}
                    onChange={(e) =>
                      setcharacter({ ...character, weapon2: e.target.value })
                    }
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="+2"
                    id="atkbonus2"
                    value={character.atkbonus2}
                    onChange={(e) =>
                      setcharacter({ ...character, atkbonus2: e.target.value })
                    }
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="1d10 + 0, Piercing"
                    id="dmg2"
                    value={character.dmg2}
                    onChange={(e) =>
                      setcharacter({ ...character, dmg2: e.target.value })
                    }
                  ></input>
                </th>
              </tr>
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Longsword"
                    id="weapon3"
                    value={character.weapon3}
                    onChange={(e) =>
                      setcharacter({ ...character, weapon3: e.target.value })
                    }
                  ></input>
                </th>
                <th>
                  <input
                    type="text"
                    placeholder="+4"
                    id="atkbonus3"
                    value={character.atkbonus3}
                    onChange={(e) =>
                      setcharacter({ ...character, atkbonus3: e.target.value })
                    }
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
              {Array(checkboxCount)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox}
                      onChange={(e) => setcheckbox(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot1lvl"
                onClick={(e) =>
                  checkboxCount < 4 && setCheckboxCount(checkboxCount + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount1)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox1}
                      onChange={(e) => setcheckbox1(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot2lvl"
                onClick={() =>
                  checkboxCount1 < 3 && setCheckboxCount1(checkboxCount1 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount2)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox2}
                      onChange={(e) => setcheckbox2(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot3lvl"
                onClick={(e) =>
                  checkboxCount2 < 3 && setCheckboxCount2(checkboxCount2 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount3)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox3}
                      onChange={(e) => setcheckbox3(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot4lvl"
                onClick={(e) =>
                  checkboxCount3 < 3 && setCheckboxCount3(checkboxCount3 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount4)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox4}
                      onChange={(e) => setcheckbox4(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot5lvl"
                onClick={(e) =>
                  checkboxCount4 < 3 && setCheckboxCount4(checkboxCount4 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount5)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox5}
                      onChange={(e) => setcheckbox5(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot6lvl"
                onClick={(e) =>
                  checkboxCount5 < 2 && setCheckboxCount5(checkboxCount5 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount6)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox6}
                      onChange={(e) => setcheckbox6(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot7lvl"
                onClick={(e) =>
                  checkboxCount6 < 2 && setCheckboxCount6(checkboxCount6 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount7)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox7}
                      onChange={(e) => setcheckbox7(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot8lvl"
                onClick={(e) =>
                  checkboxCount7 < 1 && setCheckboxCount7(checkboxCount7 + 1)
                }
              >
                +
              </button>
            </div>
            <div>
              {Array(checkboxCount8)
                .fill(0)
                .map((x, i) => {
                  return (
                    <input
                      type="checkbox"
                      value={checkbox8}
                      onChange={(e) => setcheckbox8(e.target.checked)}
                    ></input>
                  );
                })}
              <button
                id="spellslot9lvl"
                onClick={(e) =>
                  checkboxCount8 < 1 && setCheckboxCount8(checkboxCount8 + 1)
                }
              >
                +
              </button>
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
