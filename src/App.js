
import { useState } from 'react';
import './App.css';
// import spellslotfunction from './adventurersheet-script';

function App() {
  const [checkbox,setcheckbox] = useState(false);

  const [checkboxCount, setCheckboxCount] = useState(1);

  return (
    <div className="App">
      <div className='upper-body-box'>
        <div className='Upper-body'>
          <p>Adventurer name</p>
          <input type='text' placeholder='Adventurer name'>
          </input>
          <p>
            Class & lvl's
          </p>
          <input type='text' placeholder='Warlock 1 / Fighter 1' max={40}></input>
          <p>
            Background
          </p>
          <input type='text' placeholder='Urchin' max={40}></input>

        </div>
        <div className='Upper-body-lower'>
          <p>
            Race
          </p>
          <input type='text' placeholder='Human' max={40}></input>
          <p>
            Alignment
          </p>
          <input type='text' placeholder='Neutral Good' max={40}></input>
          <p>
            Experience
          </p>
          <input type='number' placeholder='0' min={0} max={355000}></input>
        </div>
      </div>

      <div className='middle-body'>
        <div className='left-middle-body'>
          <div className='statscolumn'>
            <div className='strengthbox'>
              <div className='strengthnumbers'>
                <input type='number' placeholder='+2' max={+7} min={-1} ></input>
                <input type='number' placeholder='15' max={24} min={1}></input>
                <p> Strength</p>
              </div>
            </div>
            <div className='strengthnumbers'>
              <input type='number' placeholder='+0' max={+5} min={-1} ></input>
              <input type='number' placeholder='10' max={20} min={1}></input>
              <p> Dexterity</p>
            </div>
            <div className='strengthnumbers'>
              <input type='number' placeholder='+3' max={+5} min={-1} ></input>
              <input type='number' placeholder='16' max={20} min={1}></input>
              <p> Constitution</p>
            </div>
            <div className='strengthnumbers'>
              <input type='number' placeholder='+1' max={+5} min={-1} ></input>
              <input type='number' placeholder='12' max={20} min={1}></input>
              <p> Intelligence</p>
            </div>
            <div className='strengthnumbers'>
              <input type='number' placeholder='+2' max={+5} min={-1} ></input>
              <input type='number' placeholder='14' max={20} min={1}></input>
              <p> Wisdom</p>
            </div>
            <div className='strengthnumbers'>
              <input type='number' placeholder='-1' max={+5} min={-1} ></input>
              <input type='number' placeholder='8' max={20} min={1}></input>
              <p> Charisma</p>
            </div>
          </div>
          <div>
            <div>
              <div className='inspiration-box'>
                <input type='number' placeholder='0' className='inspiration-input'></input>
                <p>INSPIRATION</p>
              </div>
              <div className='inspiration-box'>
                <input type='text' placeholder='+2' className='inspiration-input' ></input>
                <p>PROFICIENCY BONUS</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox' defaultChecked></input>
                <input type='text' className='saving-throw-number' placeholder='+4'></input>
                <p>Strength</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+0'></input>
                <p>Dexterity</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox' defaultChecked ></input>
                <input type='text' className='saving-throw-number' placeholder='+5'></input>
                <p>Constitution</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>Intelligence</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Wisdom</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Charisma</p>
              </div>
              <p>SAVING THROWS</p>
            </div>
            <div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Acrobatics (Dex)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Animal Handling (Wis)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>Arcana (Int)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Athletics (Str)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Deception (Cha)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>History (Int)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Insight (Wis)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Intimidation (Cha)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>Investigation (Int)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Medicine (Wis)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>Nature (Int)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Perception (Wis)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Performance (Cha)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='-1'></input>
                <p>Persuasion (Cha)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+1'></input>
                <p>Religion (Int)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox' defaultChecked></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Sleight of Hand (Dex)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox' defaultChecked></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Stealth (Dex)</p>
              </div>
              <div className='savingthrowline'>
                <input type='checkbox'></input>
                <input type='text' className='saving-throw-number' placeholder='+2'></input>
                <p>Survival (Wis)</p>
              </div>
              <p>SKILLS</p>
            </div>
          </div>
        </div>

        <div className='Hitpointsbox'>
          <div className='arm-init-spd-box'>
            <div className='armorbox'>
              <input type='number' placeholder='14'></input>
              <p>Armor class</p>
            </div>
            <div className='armorbox'>
              <input type='number' placeholder='0'></input>
              <p>Initiative</p>
            </div>
            <div className='armorbox'>
              <input type='number' placeholder='30'></input>
              <p>Speed</p>
            </div>
          </div>
          <p>
            CURRENT HIT POINTS
          </p>
          <textarea placeholder='Hit Point Maximum  13'></textarea>
          <p>
            TEMPORARY HIT POINTS
          </p>
          <textarea placeholder='1'>
          </textarea>
          <div className='hit-dice-box'>
            <div>
              <p>
                HIT DICE
              </p>
              <textarea className='hit-dice-textarea' placeholder='Total 1d10 + 3'>
              </textarea>
            </div>
            <div className='death-saves-box'>
              <p>
                DEATH SAVES
              </p>
              <div className='deathcheckboxes'>
                <p>SUCCESSES</p>
                <input type='checkbox'></input>
                <input type='checkbox'></input>
                <input type='checkbox'></input>
              </div>
              <div className='deathcheckboxes'>
                <p>FAILURES</p>
                <input type='checkbox'></input>
                <input type='checkbox'></input>
                <input type='checkbox'></input>
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
                <th><input type='text' placeholder='Rapier'></input></th>
                <th><input type='text' placeholder='+2'></input></th>
                <th><input type='text' placeholder='1d8 + 0, Piercing'></input></th>
              </tr>
              <tr>
                <th><input type='text' placeholder='Heavy Crossbow'></input></th>
                <th><input type='text' placeholder='+2'></input></th>
                <th><input type='text' placeholder='1d10 + 0, Piercing'></input></th>
              </tr>
              <tr>
                <th><input type='text' placeholder='Longsword'></input></th>
                <th><input type='text' placeholder='+4'></input></th>
                <th><input type='text' placeholder='1d8/1d10 + 4, Slashing'></input></th>
              </tr>
            </table>
          </div>
          <div className='equipmentbox'>
            <div className='coinsboxbody'>
              <div className='coinsbox'>
                <p>CP</p>
                <input type='number' placeholder='0' className='coinsinput'></input>
              </div>
              <div className='coinsbox'>
                <p>SP</p>
                <input type='number' placeholder='0' className='coinsinput'></input>
              </div>
              <div className='coinsbox'>
                <p>EP</p>
                <input type='number' placeholder='0' className='coinsinput'></input>
              </div>
              <div className='coinsbox'>
                <p>GP</p>
                <input type='number' placeholder='0' className='coinsinput'></input>
              </div>
              <div className='coinsbox'>
                <p>PP</p>
                <input type='number' placeholder='0' className='coinsinput'></input>
              </div>
            </div>
            
            <div>
              <textarea className='equipment-textarea' placeholder='Set of common clothes'></textarea>
              <p>EQUIPMENT</p>
            </div>
          </div>
          <div className='spell-slots-box'>
            <div id='spellslots-1lvl-container'>
              {Array(checkboxCount) // [0]
                .fill(0)
                .map((x, i) => {
                  return (
                      <input type='checkbox' value={checkbox} onChange={e => setcheckbox(e.target.checked)}></input>
                  );
                })
              }
              <button id='spellslot1lvl' onClick={e => checkboxCount < 4 && setCheckboxCount(checkboxCount + 1)}>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
              <button>+</button>
            </div>
            <div>
              <input type='checkbox'></input>
            </div>
            <p>SPELL SLOTS</p>
          </div>

        </div>
        <div>
          <div>
            <textarea placeholder='I ask a lot of questions' className='personality-textarea'></textarea>
            <p>PERSONALITY TRAITS</p>
          </div>
          <div>
            <textarea placeholder=' All people, rich or poor, deserve respect' className='personality-textarea'></textarea>
            <p>IDEALS</p>
          </div>
          <div>
            <textarea placeholder='No one else should have to endure the hardships I have been through' className='personality-textarea'></textarea>
            <p>BONDS</p>
          </div>
          <div>
            <textarea placeholder='If I am outnumbered, I will run away from a fight.' className='personality-textarea'></textarea>
            <p>FLAWS</p>
          </div>
          <div>
            <textarea className='features-textarea'></textarea>
            <p>FEATURES & TRAITS</p>
          </div>
        </div>

      </div>
    </div>

  );
}

export default App;
