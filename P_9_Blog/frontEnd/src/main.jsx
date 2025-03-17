import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import ShowBlogs from './components/ShowBlogs'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="blogs" element={<ShowBlogs/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
