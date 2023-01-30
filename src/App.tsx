import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import CalendarPage from './pages/CalendarPage'
import UserContextProvider from './contexts/UserContext'
import Nav from './components/Nav'
import PostEvents from './components/CreateEventForm'
import TemplateContextProvider from './contexts/TemplateContext'
import CreateTemplatePage from './pages/CreateTemplatePage'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import TemplatePage from './pages/TemplatePage'

export const supabase = createClient("https://jczttxmgknqmhdwgpmvl.supabase.co", import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY)
function App() {



  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <TemplateContextProvider>
            <Nav />
            <Routes>
              <Route element={<Homepage />} path='/' />
              <Route element={<CalendarPage />} path='/calendar' />
              <Route element={<CreateTemplatePage />} path='/new-template' />
              <Route element={<TemplatePage />} path='/template/:id' />
            </Routes>
          </TemplateContextProvider>
        </UserContextProvider>
      </Router>
    </div>
  )
}

export default App
