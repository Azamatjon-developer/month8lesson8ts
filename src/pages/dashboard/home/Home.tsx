import Sidebar from '../../../components/sidebar/Sidebar'
import TopCreators from '../../../components/topCreators/TopCreators'

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className='w-[60%] bg-blue-500'>
        <h2>Home Feed </h2>
      </div>
      <TopCreators/>
    </div>
  )
}

export default Home
