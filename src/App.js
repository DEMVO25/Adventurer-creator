import { useState } from "react";
import "./App.css";

import Login from "./login";
import Register from "./register";
import Menu from "./menu";
import Sheet from "./sheet";
import Spellsheet from "./spellsheet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("1");
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
