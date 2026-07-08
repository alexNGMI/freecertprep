import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Part107 from './pages/Part107.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Part107 />
  </StrictMode>,
)
