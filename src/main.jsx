import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/outfit"; // Defaults to 400 (Regular)
import "@fontsource/outfit/300.css"; // Light
import "@fontsource/outfit/500.css"; // Medium
import "@fontsource/outfit/700.css"; // Bold

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
