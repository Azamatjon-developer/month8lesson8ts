import { Link, NavLink, useNavigate } from 'react-router-dom'
import snap from '../../assets/images/Snap.svg'
import { useGetUserQuery } from '../../redux/api/user-slice'
import HomeIcon from '../../assets/images/Homeicon.svg'
import ExploreIcon from '../../assets/images/ExploreIcon.svg'
import PeopleIcon from '../../assets/images/PeopleIcon.svg'
import SavedIcon from '../../assets/images/SavedIcon.svg'
import ReelsIcon from '../../assets/images/ReelsIcon.svg'
import ChatsIcon from '../../assets/images/ChatsIcon.svg'
import createIcon from '../../assets/images/CreatePostIcon.svg'
import logOut from '../../assets/images/LogOutIcon.svg'
import settings from '../../assets/images/SettingsIcon.svg'
import { useState } from 'react'
import { Modal } from 'antd'
import noImage from '../../assets/images/noImage.jpg'

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    window.localStorage.clear()
    window.location.reload()
    window.location.href = '/'
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  const username = userData?.username || ''
  const { data } = useGetUserQuery(username)

  let user = localStorage.getItem('x-auth-token')
  if (!user) {
    navigate('/login')
  }
  
  return (
    <div className="col-span-2 bg-[#1c1c1c] shadow-lg overflow-y-auto h-screen">
      <div className="pt-12 px-6 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <img src={snap} alt="snap" className="w-8 h-8" />
          <h2 className="text-white text-2xl font-bold">Sidebar</h2>
        </div>
        <Link to="/profile">
          <div className="flex items-center gap-4">
            <img src={noImage} className='w-[56px] h-[56px] border-[3px] border-[#877EFF] rounded-full' alt="noImage" />
            <div>
              <h3 className="text-white font-semibold text-lg">{data?.fullName}</h3>
              <p className="text-slate-400 font-medium text-sm">@{data?.username}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-4 px-6">
        {[
          { to: '/', icon: HomeIcon, label: 'Home' },
          { to: '/explore', icon: ExploreIcon, label: 'Explore' },
          { to: '/people', icon: PeopleIcon, label: 'People' },
          { to: '/saved', icon: SavedIcon, label: 'Saved' },
          { to: '/reels', icon: ReelsIcon, label: 'Reels' },
          { to: '/chats', icon: ChatsIcon, label: 'Chats' },
          { to: '/createPosts', icon: createIcon, label: 'Create Post', mb: 'mb-16' },
        ].map(({ to, icon, label, mb }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              `text-white flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#877EFF] transition duration-300 ${isActive ? 'bg-[#877EFF]' : ''} ${mb || ''}`
            }
            to={to}
          >
            <img src={icon} alt={label.toLowerCase()} className="w-6 h-6" />
            {label}
          </NavLink>
        ))}
        <div
          onClick={showModal}
          className="text-white flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-[#877EFF] transition duration-300"
        >
          <img src={logOut} alt="logout" className="w-6 h-6" />
          Log Out
        </div>
        <NavLink
          className={({ isActive }) =>
            `text-white flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#877EFF] transition duration-300 ${isActive ? 'bg-[#877EFF] rounded-xl' : ''}`
          }
          to={'/settings'}
        >
          <img src={settings} alt="settings" className="w-6 h-6" />
          Settings
        </NavLink>
        <Modal
          title="Are you sure you want to log out?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p className="text-xl font-bold">Are you sure you want to log out?</p>
        </Modal>
      </div>
    </div>
  )
}

export default Sidebar
