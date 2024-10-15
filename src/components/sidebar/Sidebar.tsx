import { NavLink } from 'react-router-dom'
import snap from '../../assets/images/Snap.svg'

const Sidebar = () => {
  return (
    <div className="w-[20%] bg-[#09090A]">
      <div className="pt-[48px] pl-[24px] pr-[24px] pb-[44px]">
        <div className="flex items-center gap-[5px]">
          <img src={snap} alt="snap" />
          <h2 className="text-white text-[28px] font-bold">Sidebar</h2>
        </div>
      </div>

      <div className="flex flex-col gap-5 pl-[24px]">
        <NavLink className={'text-white'} to={'/'}>
          Home
        </NavLink>
        <NavLink className={'text-white'} to={'/explore'}>
          Explore
        </NavLink>
        <NavLink className={'text-white'} to={'/people'}>
          People
        </NavLink>
        <NavLink className={'text-white'} to={'/saved'}>
          Saved
        </NavLink>
        <NavLink className={'text-white'} to={'/reels'}>
          Reels
        </NavLink>
        <NavLink className={'text-white'} to={'/chats'}>
          Chats
        </NavLink>
        <NavLink className={'text-white'} to={'/createPosts'}>
          Create Post
        </NavLink>
        <NavLink className={'text-white'} to={'/logOut'}>
          Log Out
        </NavLink>
        <NavLink className={'text-white'} to={'/settings'}>
          Settings
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
