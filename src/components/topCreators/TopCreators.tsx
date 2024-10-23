import { useNavigate } from 'react-router-dom'
import {
  useFollowMutation,
  useGetAllUsersQuery,
  useGetUserByUsernameQuery,
  useUnfollowMutation,
} from '../../redux/api/user-slice'
import { useState } from 'react'

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true)
  const [followUser] = useFollowMutation()
  const [unfollowUser] = useUnfollowMutation()
  const navigate = useNavigate()

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null)
  const [usersToShow] = useState(8)

  const currentusername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null

  const { data: userData } = useGetUserByUsernameQuery(currentusername)
  const handleFollowUser = async (username: string): Promise<void> => {
    setLoadingUserId(username)
    try {
      await followUser(username)
    } finally {
      setLoadingUserId(null)
    }
  }

  const handleUnfollowUser = async (username: string): Promise<void> => {
    setLoadingUserId(username)
    try {
      await unfollowUser(username)
    } finally {
      setLoadingUserId(null)
    }
  }

  return (
    <div className="col-span-3 text-white sticky top-0 h-screen overflow-y-auto">
      <div className="text-[#ffffff] text-[24px] pt-[48px] pl-[24px] pr-[24px] pb-[40px]">
        <h2>Top Creators</h2>
      </div>

      <div className=" ">
        <div className="flex flex-wrap gap-[20px] ">
          {data.slice(0, usersToShow).map((user: any) => (
            <div className="" key={user._id}>
              <div className="border cursor-pointer flex flex-col gap-[44px] mb-[24px] border-slate-500 w-[190px] h-[190px] rounded-lg pt-[24px] pl-[34px] pr-[34px] pb-[24px] text-center">
                <div onClick={() => navigate(`/users/${user.username}`)}>
                  <h2 className="font-semibold line-clamp-1 text-[16px] text-white pb-[10px]">
                    {user.username} 
                    <h3 className='line-clamp-1'>{user.fullName}</h3>
                  </h2>
                </div>
                {userData?.following?.some(
                  (item: any) => item.username === user.username,
                ) ? (
                  <button
                    className="bg-red-500 rounded-md pt-[8px] pb-[8px] pl-[18px] pr-[18px] font-semibold"
                    onClick={() => handleUnfollowUser(user.username)}
                    disabled={loadingUserId === user.username}
                  >
                    {loadingUserId === user.username
                      ? 'Loading...'
                      : 'Unfollow'}
                  </button>
                ) : (
                  <button
                    className="bg-[#877EFF] rounded-md pt-[8px] pb-[8px] pl-[18px] pr-[18px] font-semibold"
                    onClick={() => handleFollowUser(user.username)}
                    disabled={loadingUserId === user.username}
                  >
                    {loadingUserId === user.username
                      ? 'Loading'
                      : 'Follow'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopCreators
