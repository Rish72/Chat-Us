import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import {LoaderPinwheel} from "lucide-react";
import { useEffect } from "react"
import {Toaster} from "react-hot-toast"
import { useThemesStore } from "./store/useThemesStore"

const App = () => {

  const {authUser , checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemesStore();
  
  // console.log("auth user in app comp ",authUser);
  useEffect( ()=>{
    checkAuth()
  },[checkAuth] )

  if(isCheckingAuth && !authUser){
      return(
        <div className="flex items-center justify-center h-screen">
        <LoaderPinwheel  className="size-10 animate-spin opacity-10"/>
      </div>
      )
    }
    
    return (
      <div data-theme={theme}>
      < NavBar />
      <Routes>
        < Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        < Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
        < Route path="/login" element={!authUser ? <LogInPage/> : <Navigate to="/" />}/>
        < Route path="/settings" element={<SettingPage/>}/>
        < Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
        < Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App