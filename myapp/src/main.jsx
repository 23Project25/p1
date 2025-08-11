import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import User from './user.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <User />
  </StrictMode>,
)
