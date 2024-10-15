import { Outlet } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import TopCreators from '../../../components/topCreators/TopCreators'

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[20%] fixed">
        <Sidebar />
      </div>

      <div className="flex-grow ml-[20%] mr-[400px] py-16 px-8 overflow-y-scroll h-full">
        <h2>Home Feed</h2>
        <Outlet />
      </div>

      <div className="w-[20%] fixed right-0 h-full pr-4 bg-black">
        <div className="text-white text-center">
          <TopCreators />
        </div>
      </div>
    </div>
  )
}
export default Home
