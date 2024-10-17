import { NavLink } from 'react-router-dom'
import snap from '../../assets/images/Snap.svg'
import { useGetUserQuery } from '../../redux/api/user-slice'
import HomeIcon from "../../assets/images/HomeIcon.svg"
import ExploreIcon from "../../assets/images/ExploreIcon.svg"
import PeopleIcon from "../../assets/images/PeopleIcon.svg"
import SavedIcon from "../../assets/images/SavedIcon.svg"
import ReelsIcon from "../../assets/images/ReelsIcon.svg"
import ChatsIcon from "../../assets/images/ChatsIcon.svg"
import createIcon from "../../assets/images/CreatePostIcon.svg"
import logOut from "../../assets/images/LogOutIcon.svg"
import settings from "../../assets/images/SettingsIcon.svg"
const Sidebar = () => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  const username = userData?.username || ''
  const { data } = useGetUserQuery(username)
  return (
    <div className="col-span-2 bg-black overflow-y-auto h-screen ">
      <div className="pt-[48px] pl-[24px] pr-[24px] pb-[44px] ">
        <div className="flex items-center gap-[5px]">
          <img src={snap} alt="snap" />
          <h2 className="text-white text-[28px] font-bold">Sidebar</h2>
        </div>
          <h3 className="text-white font-bold text-[24px] pt-[20px]">{data?.fullName}</h3>
          <h3 className="text-slate-400 font-bold text-[16px]">{data?.username}</h3>
      </div>
      <div className="flex flex-col gap-5 pl-[24px]">
        
        <NavLink className={'text-white flex items-center gap-2'} to={'/'}>
        <img src={HomeIcon} alt="home" />
          Home
        </NavLink>

        <NavLink className={'text-white flex items-center gap-2'} to={'/explore'}>
        <img src={ExploreIcon} alt="home" />
          Explore
        </NavLink>
        <NavLink className={'text-white flex items-center gap-2'} to={'/people'}>
        <img src={PeopleIcon} alt="home" />
          People 
        </NavLink>
        <NavLink className={'text-white flex items-center gap-2'} to={'/saved'}>
        <img src={SavedIcon} alt="home" />
          Saved 
        </NavLink>
        
        <NavLink className={'text-white flex items-center gap-2'} to={'/reels'}>
        <img src={ReelsIcon} alt="reels" />
          Reels 
        </NavLink>
        <NavLink className={'text-white flex items-center gap-2'} to={'/chats'}>
        <img src={ChatsIcon} alt="reels" />
        Chats
        </NavLink>
        <NavLink className={'text-white flex items-center gap-2 mb-[108px]'} to={'/createPosts'}>
        <img src={createIcon} alt="reels" />
        Create Post
        </NavLink>

        <NavLink className={'text-white flex items-center gap-2'} to={'/logOut'}>
        <img src={logOut} alt="reels" />
        LogOut
        </NavLink>
        <NavLink className={'text-white flex items-center gap-2'} to={'/settings'}>
        <img src={settings} alt="reels" />
        Settings 
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
