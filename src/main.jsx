import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter alternative note:
        BrowserRouter works on Netlify/Vercel with the included redirect rules.
        For GitHub Pages project sites, swap to <HashRouter> if you prefer. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
