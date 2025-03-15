import NavBar from "../src/Pages/NavBar"
import HomePage from "../src/Pages/HomePage"
import Login from "../src/Pages/Login"
import SIgnUp from "./Pages/SIgnUp"
import ProfilePage from "../src/Pages/ProfilePage"
import Settings from "../src/Pages/Settings"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./Store/UseAuthStore"
import { useEffect, useState } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[])

  console.log("online Users are ",onlineUsers)

  if(isCheckingAuth && !authUser){
    return (<div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>)
  }

  return (
    <>
    <div className="flex">
      {authUser && <NavBar />}
        <Routes>
          <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!authUser ? <Login/> :  <Navigate to="/"/> }/>
          <Route path="/signup" element={!authUser ? <SIgnUp/> :  <Navigate to="/"/>}/>
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/> }/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>

        <Toaster/>
    </div>
     
    </>
  )
}

export default App
