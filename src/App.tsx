import { useContext } from 'react'
import './App.css'
import { Context } from './context/Context'
import RegisterRoutes from './router/register'
import { DashboardRoutes } from './router/dashboard'

function App() {
  const context = useContext(Context)
  return (
    <>
      {context?.token ? <DashboardRoutes/> : <RegisterRoutes/>}
    </>
  )
}

export default App
