import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Menu({ username }) {
  const navigate = useNavigate();
  const [buttons, setButtons] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingName, setEditingName] = useState(null);
  const [deletingName, setDeletingName] = useState(null);
  const dialogEdit = useRef(null);
  const dialogDelete = useRef(null);

  function toggleDialog(dialog) {
    if (dialog.current) {
      dialog.current.hasAttribute("open")
        ? dialog.current.close()
        : dialog.current.showModal();
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  }

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
    try {
      const response = await fetch(`/menu/${deletingName}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setButtons((prevButtons) =>
          prevButtons.filter((button) => button.text !== deletingName)
        );
        alert(data.message);
        setDeletingName(null);
        toggleDialog(dialogDelete);
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
        toggleDialog(dialogEdit);
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

      if (data.message === "Character already exists") {
        alert(data.message);
        return;
      }

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
      <button onClick={handleLogout}>Log out</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleClick}>Create Character</button>

      {buttons.map((button, index) => (
        <div key={index}>
          <button onClick={() => handleClick1(button.text)}>
            {button.text}
          </button>
          <button
            onClick={() => {
              setEditingName(button.text);
              setEditText(button.text);
              toggleDialog(dialogEdit);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setDeletingName(button.text);
              toggleDialog(dialogDelete);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <dialog ref={dialogEdit}>
        <button
          onClick={() => {
            dialogEdit.current?.close();
          }}
        >
          x
        </button>
        <h2>Edit Character</h2>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={handleEdit}>Save</button>
        <button
          onClick={() => {
            setEditingName(null);
            setEditText("");
            dialogEdit.current?.close();
          }}
        >
          Cancel
        </button>
      </dialog>

      <dialog ref={dialogDelete}>
        <button
          onClick={() => {
            dialogDelete.current?.close();
          }}
        >
          x
        </button>
        <h2>Delete Character</h2>
        <p>Are you sure you want to delete "{deletingName}"?</p>

        <button onClick={handleDelete}>Yes</button>
        <button
          onClick={() => {
            setDeletingName(null);
            dialogDelete.current?.close();
          }}
        >
          Cancel
        </button>
      </dialog>
    </div>
  );
}

export default Menu;
