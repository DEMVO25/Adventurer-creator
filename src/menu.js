
import React from 'react';



function Menu () {
  const [buttons, setButtons] = React.useState([]);
  const [text, setText] = React.useState('');

  const handleClick = () => {
    const existingButton = buttons.find((button) => button.text === text);
    if (existingButton) {
      alert(`Button with name "${text}" already exists!`);
    } else {
      setButtons([...buttons, { text }]);
      setText('');
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Menu page</h1>
        <input type="text" value={text} onChange={handleTextChange} />
        <button onClick={handleClick}>Create Character</button>
        {buttons.map((button, index) => (
          <button key={index}>{button.text}</button>
        ))}
      </div>
    </div>
  );
}

export default Menu;