import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/*" element={ <h1 className={"font-bold text-center text-4xl mt-[200px]"}>404 Not Found!</h1> }/>
    </Routes>
  </BrowserRouter>
)
