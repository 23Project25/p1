import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< Updated upstream
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
=======
import Home from './Home.jsx'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home/>
    <Login/>
>>>>>>> Stashed changes
  </StrictMode>,
)
