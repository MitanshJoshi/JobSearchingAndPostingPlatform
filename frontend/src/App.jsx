import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Header'
import Layout from './Layout'
import Homepage from './pages/Homepage'
import Jobs from './pages/Jobs'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Homepage/>}></Route>
        <Route path="/jobs" element={<Jobs/>}/>        
        <Route path="/register" element={<Register/>}/>        
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
   </>
  )
}

export default App
