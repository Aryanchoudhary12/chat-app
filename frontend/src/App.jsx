import {Routes,Route, Navigate} from "react-router-dom"
import Home from "./page/home"
import Signin from "./page/signin"
import Login from "./page/login"
import Profile from "./page/profile"
import Setting from "./page/setting"
import Navbar from "./components/navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useTheme"
function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const {theme,setTheme} = useThemeStore() 
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log(onlineUsers)
  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin h-10 w-10 stroke-accent"/>
    </div>
  )
  return (
    
      <div data-theme={theme}>
        <Navbar/>
        <Routes>
          <Route path="/" element={authUser ?<Home/> : <Navigate to="/login"/>}/>
          <Route path="/signin" element={authUser ?<Navigate to="/"/>:<Signin/>}/>
          <Route path="/login" element={authUser ?<Navigate to="/"/>:<Login/>}/>
          <Route path="/profile" element={authUser?<Profile/>: <Navigate to="/login"/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Routes>
        <Toaster/>
      </div>
   
  )
}

export default App
