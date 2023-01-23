import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import CalendarPage from './pages/CalendarPage'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Homepage />} path='/' />
          <Route element={<CalendarPage />} path='/calendar' />
        </Routes>
      </Router>
    </div>
  )
}

export default App
