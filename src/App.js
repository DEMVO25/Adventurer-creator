import { useState } from "react";
import "./App.css";

import Login from "./login";
import Register from "./register";
import Menu from "./menu";
import Sheet from "./sheet";
import Spellsheet from "./spellsheet";
import Passwordreset from "./passwordreset";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");

  console.log(username);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUsername={setUsername} />,
    },
    {
      path: "/sheet",
      element: <Sheet />,
    },
    {
      path: "/spellsheet",
      element: <Spellsheet />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/menu",
      element: <Menu username={username} />,
    },
    {
      path: "/passwordreset",
      element: <Passwordreset />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
