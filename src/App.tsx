import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import TopCreators from './components/topCreators/TopCreators'
import RegisterRoutes from './router'

function App() {
  return (
    <>
      <div className='h-[100vh]'>
        <Sidebar />
        {<RegisterRoutes />}
        <TopCreators />
      </div>
    </>
  )
}

export default App
