import { useContext, useEffect } from 'react'
import './App.css'
import { Context } from './context/Context'
import DashboardRoutes from './router/Dashboard'
import RegisterRoutes from './router/Register'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logout } from './redux/slice/auth-slice'
import { useNavigate } from 'react-router-dom'

function App() {
  const context = useContext(Context)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "x-auth-token") {
        dispatch(logout());
        navigate("/login");
      }}

      window.addEventListener("storage", handleStorageChange);
    }, [])

  return (
    <>
      {context?.token ? <DashboardRoutes /> : <RegisterRoutes />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
