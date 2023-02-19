import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from './routes'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Router>
        <AppRoute />
    </Router>
  </ThemeProvider>
)
