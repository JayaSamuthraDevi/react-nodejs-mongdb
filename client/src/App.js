import React from "react";
import "./App.css";
import "./login.css";

import Records from "./components/Records";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";
import Login from "./components/Login";
// import Logout from './components/Logout';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AddUser />,
    },
    {
      path: "/getUsers",
      element: <Records />,
    },
    {
      path: "/updateUser/:id",
      element: <UpdateUser />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path:"/logout",
    //   element:(<Logout />
    //   ),
    // },
  ]);

  return <RouterProvider router={router} />  
  

}

export default App;
