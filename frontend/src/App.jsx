import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      < NavBar />
      <Routes>
        < Route path="/" element={<HomePage/>}/>
        < Route path="/signup" element={<SignUpPage/>}/>
        < Route path="/login" element={<LogInPage/>}/>
        < Route path="/setting" element={<SettingPage/>}/>
        < Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App