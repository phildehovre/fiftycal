import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import CalendarPage from './pages/CalendarPage'
import UserContextProvider from './contexts/UserContext'
import Nav from './components/Nav'
import PostEvents from './components/PostEvents'

function App() {



  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <Nav />
          <Routes>
            <Route element={<Homepage />} path='/' />
            <Route element={<CalendarPage />} path='/calendar' />
            <Route element={<PostEvents />} path='/post' />

          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  )
}

export default App
