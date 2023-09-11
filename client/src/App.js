import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import Records from './components/Records';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';

import {  createBrowserRouter ,RouterProvider} from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:(<AddUser/>
      ),
    },
    {  
      path:"/getUsers",
      element:(<Records/>
      ),
    },
    {
      path:"/updateUser/:id",
      element:(<UpdateUser />
      ),
    },
    
  ]);
    
 

  return (
    < RouterProvider router={router} />
   
  );
}

export default App;
