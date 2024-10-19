import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/dashboard/home/Home'
import Sidebar from '../../components/sidebar/Sidebar'
import Explore from '../../pages/dashboard/explore/Explore'
import People from '../../pages/dashboard/people/People'
import Saved from '../../pages/dashboard/saved/Saved'
import Reels from '../../pages/dashboard/reels/Reels'
import CreatePosts from '../../pages/dashboard/createPost/CreatePosts'
import Settings from '../../pages/dashboard/settings/Settings'
import Chats from '../../pages/dashboard/chats/Chats'
import Profile from '../../pages/dashboard/profile/Profile'

const DashboardRoutes = () => {
  return (
    <main className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/people" element={<People />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/createPosts" element={<CreatePosts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </main>
  )
}

export default DashboardRoutes
