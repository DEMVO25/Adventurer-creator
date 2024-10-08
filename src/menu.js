
import React from 'react';
import { useNavigate } from 'react-router-dom';



function Menu({ username }) {
  const navigate = useNavigate();

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

  const handleClick1 = () => {
    navigate('/sheet')
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Menu page</h1>
        <div>{username}</div>
        <input type="text" value={text} onChange={handleTextChange} />
        <button onClick={handleClick}>Create Character</button>
        {buttons.map((button, index) => (
          <button onClick={handleClick1} key={index}>{button.text}</button>
        ))}
      </div>
    </div>
  );
}

export default Menu;