import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from './Components/Context/LoginContext';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </LoginContext>
  </StrictMode>,
)
