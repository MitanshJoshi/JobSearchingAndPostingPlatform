import { useEffect, useState } from 'react'
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage'
import { useDispatch } from 'react-redux'
import { getuser } from './store/slices/userSlice'
import PostApplicationComp from './pages/PostApplication'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuser());
  }, [])
  
  return (
   <>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index element={<Homepage/>}></Route>
        <Route path="/jobs" element={<Jobs/>}/>        
        <Route path="/register" element={<Register/>}/>  
        <Route path="/dashboard" element={<Dashboard/>}/>  
        <Route path="/login" element={<LoginPage/>}/>      
        <Route path="/post/application/:id" element={<PostApplicationComp/>}/>      
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <ToastContainer position='bottom-right' autoClose="1000"/>
   </>
  )
}

export default App
