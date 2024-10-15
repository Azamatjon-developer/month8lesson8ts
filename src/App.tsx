import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import TopCreators from './components/topCreators/TopCreators'
import RegisterRoutes from './router'

function App() {

  const login: string | null = localStorage.getItem("x-auth-token")
  return (
    <>
      <div >
      {
      login ?  <Sidebar /> : null
        
      } 
        {<RegisterRoutes />}
        {login ? <TopCreators /> : null }
        
      </div>
    </>
  )
}

export default App
