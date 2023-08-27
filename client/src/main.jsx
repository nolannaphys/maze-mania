import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Maze from './pages/Maze'
import Profile from './pages/Profile'


import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/maze', element: <Maze /> },
      { path: '/profile', element: <Profile /> },
      { path: '*', element: <Error /> },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  <RouterProvider router={router} />
)