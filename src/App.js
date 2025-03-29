import { useEffect, useState } from "react";
import "./App.css";

import Login from "./login";
import Register from "./register";
import Menu from "./menu";
import Sheet from "./sheet";
import Spellsheet from "./spellsheet";
import Passwordreset from "./passwordreset";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");

  return (
    <BrowserRouter>
      <Login username={username} setUsername={setUsername}>
        <Routes >
          <Route path="/" element={<Menu username={username}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/sheet" element={<Sheet />} />
          <Route path="/spellsheet" element={<Spellsheet />} />
          <Route path="/passwordreset" element={<Passwordreset />} />
        </Routes>
      </Login>
    </BrowserRouter>
  );
}

export default App;
