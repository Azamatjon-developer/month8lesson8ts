import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/dashboard/home/Home'
import Sidebar from '../../components/sidebar/Sidebar'
import People from '../../pages/dashboard/people/People'
import CreatePosts from '../../pages/dashboard/createPost/CreatePosts'
import Settings from '../../pages/dashboard/settings/Settings'
import Profile from '../../pages/dashboard/profile/Profile'
import NotFound from '../../pages/dashboard/notFound/NotFound'
import Users from '../../pages/dashboard/users/Users'

const DashboardRoutes = () => {
  return (
    <main className="grid grid-cols-12">
      <Sidebar />
      <div className="col-span-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<NotFound />} />
          <Route path="/people" element={<People />} />
          <Route path="/saved" element={<NotFound />} />
          <Route path="/reels" element={<NotFound />} />
          <Route path="/chats" element={<NotFound />} />
          <Route path="/createPosts" element={<CreatePosts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:username" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  )
}

export default DashboardRoutes
