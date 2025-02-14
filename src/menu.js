import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu({ username }) {
  const navigate = useNavigate();
  const [buttons, setButtons] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingName, setEditingName] = useState(null);

  useEffect (() => {
    if (!username){
      navigate('/')
    }
  },[]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`/menu/${username}`);
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          setButtons(data.map((character) => ({ text: character.name })));
        } else {
          console.error("Invalid response format:", data);
          alert("Failed to load characters.");
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
        alert("An error occurred while fetching characters.");
      }
    };

    if (username) {
      fetchCharacters();
    }
  }, [username]); 

  const handleDelete = async (characterName) => {
    if (
      !window.confirm(`Are you sure you want to delete "${characterName}"?`)
    ) {
      return;
    }

    try {
      const response = await fetch(`/menu/${characterName}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setButtons((prevButtons) =>
          prevButtons.filter((button) => button.text !== characterName)
        );
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting character:", error);
      alert("An error occurred while deleting the character.");
    }
  };

  const handleEdit = async () => {
    if (!editText.trim()) {
      alert("Character name cannot be empty!");
      return;
    }

    if (buttons.some((button) => button.text === editText)) {
      alert("Character name already exists!");
      return;
    }

    try {
      const response = await fetch(`/menu/${editingName}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: editText }),
      });

      const data = await response.json();
      if (response.ok) {
        setButtons((prevButtons) =>
          prevButtons.map((button) =>
            button.text === editingName ? { text: editText } : button
          )
        );
        setEditingName(null);
        setEditText("");
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating character:", error);
      alert("An error occurred while updating the character.");
    }
  };

  const handleClick = async () => {
    if (buttons.some((button) => button.text === text)) {
      alert(`Button with name "${text}" already exists!`);
      return;
    }

    try {
      const response = await fetch("/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buttonname: text, username }),
      });

      const data = await response.json();
      if (response.ok) {
        setButtons((prevButtons) => [...prevButtons, { text }]);
        setText("");
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating character:", error);
      alert("An error occurred while creating the character.");
    }
  };

  const handleClick1 = (buttonText) => {
    navigate("/sheet", { state: { characterName: buttonText } });
  };

  return (
    <div>
      <h1>Menu page</h1>
      <div>{username}</div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Create Character</button>

      {buttons.map((button, index) => (
        <div key={index}>
          {editingName === button.text ? (
            <div>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setEditingName(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={() => handleClick1(button.text)}>
                {button.text}
              </button>
              <button
                onClick={() => {
                  setEditingName(button.text);
                  setEditText(button.text);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(button.text)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
