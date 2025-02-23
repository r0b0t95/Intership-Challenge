import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { FooterPage } from './components/FooterPage.jsx'

createRoot(document.getElementById('root')).render(
  <>
    {/*<App />*/}
    <HomePage />
    <FooterPage />
  </>
)
