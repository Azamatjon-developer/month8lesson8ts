import { useContext } from 'react'
import './App.css'
import { Context } from './context/Context'
import DashboardRoutes from './router/Dashboard'
import RegisterRoutes from './router'

function App() {
  const context = useContext(Context)
  return <>{context?.token ? <DashboardRoutes /> : <RegisterRoutes />}</>
}

export default App
