import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  "https://jczttxmgknqmhdwgpmvl.supabase.co",
  import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
)
