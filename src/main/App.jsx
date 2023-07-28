import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import React from 'react'

export default () => (
  <BrowserRouter>
    <div className="App">
      <Routes />
    </div>
  </BrowserRouter>
)
