import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { LeaveContextProvider } from './context/LeaveContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <LeaveContextProvider>
         <App />
      </LeaveContextProvider>
  </AuthProvider>
  </BrowserRouter>
)


