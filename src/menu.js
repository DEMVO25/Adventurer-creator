import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu({ username }) {
  const navigate = useNavigate();
  const [buttons, setButtons] = React.useState([]);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    // Fetch existing characters when the component mounts
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`/menu/${username}`);
        const data = await response.json();
        if (response.ok) {
          const existingButtons = data.map((character) => ({ text: character.name }));
          setButtons(existingButtons); // Set the existing buttons
        } else {
          alert(data.message); // Handle error
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
        alert('An error occurred while fetching characters.');
      }
    };

    fetchCharacters();
  }, [username]); // Dependency array ensures this runs when username changes

  const handleClick = async () => {
    const existingButton = buttons.find((button) => button.text === text);
    if (existingButton) {
      alert(`Button with name "${text}" already exists!`);
    } else {
      // Send the button text to the server to create a character
      try {
        const response = await fetch('/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buttonname: text, username: username }),
        });

        const data = await response.json();

        if (response.ok) {
          // If character creation is successful, update the state
          setButtons([...buttons, { text }]);
          setText('');
          alert(data.message); // Show success message
        } else {
          alert(data.message); // Show error message
        }
      } catch (error) {
        console.error('Error creating character:', error);
        alert('An error occurred while creating the character.');
      }
    }
  };

  const handleClick1 = (buttonText) => {
    // Navigate to the character sheet for the selected character
    navigate('/sheet', { state: { characterName: buttonText } });
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
          <button onClick={() => handleClick1(button.text)} key={index}>{button.text}</button>
        ))}
      </div>
    </div>
  );
}

export default Menu;