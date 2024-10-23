import { useContext } from 'react'
import './App.css'
import { Context } from './context/Context'
import DashboardRoutes from './router/Dashboard'
import RegisterRoutes from './router'
import { Toaster } from 'react-hot-toast'

function App() {
  const context = useContext(Context)
  return (
    <>
      {context?.token ? <DashboardRoutes /> : <RegisterRoutes />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
