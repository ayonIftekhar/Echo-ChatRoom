import RouteProtection from './components/RouteProtection/RouteProtection'
import Login from './pages/LogIn/Login'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register/Register'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import OAuthSuccess from './pages/OAuthSuccess/OAuthSuccess'
import { Home } from './pages/Home/Home'
import { CreateRoom } from './pages/User/CreateRoom/CreateRoom'
import { ListRooms } from './pages/User/ListRooms/ListRooms'
import { MyRooms } from './pages/User/MyRooms/MyRooms'
import { SingleRoom } from './pages/User/SingleRoom/SingleRoom'
import { UserRoomProvider } from './Context/RoomContext'

function App() {
  return (
    <UserRoomProvider>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/oauth-success/:token" element={<OAuthSuccess />} />

        <Route path="/" element={<Home />} />

        {/* User Related paths */}
        <Route path="/user/chatrooms/create" element={<RouteProtection><CreateRoom /></RouteProtection>}/>
        <Route path='/user/chatrooms/all' element={<RouteProtection><ListRooms /></RouteProtection>}/>
        <Route path='/user/chatrooms/my' element={<RouteProtection><MyRooms /></RouteProtection>}/>
        <Route path='/user/chatrooms/my/:handle' element={<RouteProtection><SingleRoom /></RouteProtection>}/>
      </Routes>
      <ToastContainer></ToastContainer>
    </UserRoomProvider>
  );
}

export default App
