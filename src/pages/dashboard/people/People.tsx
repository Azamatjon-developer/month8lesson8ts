import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice'
import userIcon from '../../../assets/images/UsersIcon.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const People = () => {
  const { data: users } = useGetAllUsersQuery({})
  const [followUser] = useFollowMutation()
  const [unfollowUser] = useUnfollowMutation()
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null)
  const [visibleUsers, setVisibleUsers] = useState<number>(20)
  const handleFollow = async (username: string) => {
    setLoadingUserId(username)
    try {
      await followUser(username).unwrap()
    } catch (error) {
      console.error('Error following user:', error)
    } finally {
      setLoadingUserId(null)
    }
  }

  const handleUnfollow = async (username: string) => {
    setLoadingUserId(username)
    try {
      await unfollowUser(username).unwrap()
    } catch (error) {
      console.error('Error unfollowing user:', error)
    } finally {
      setLoadingUserId(null)
    }
  }

  const currentUsername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const { data: userData } = useGetUserByUsernameQuery(currentUsername)
  const navigate = useNavigate()

  const handleSeeMore = () => {
    setVisibleUsers((prev) => prev + 10)
  }

  return (
    <div className="bg-[#000000] pt-[80px] px-4 h-screen overflow-y-auto">
      <div className="flex items-center gap-4 text-white mb-8">
        <img className="w-[40px] md:w-[50px]" src={userIcon} alt="Users Icon" />
        <h2 className="text-2xl md:text-[36px]">All users</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.slice(0, visibleUsers).map((user: any) => (
          <div
            key={user._id}
            className="w-full h-[300px] border border-slate-500 p-5 rounded-lg shadow-lg text-white flex flex-col justify-between"
          >
            <div
              onClick={() => navigate(`/postProfile`)}
              className="cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">
                Name: {user.fullName}
              </h2>
              <h3 className="text-lg text-gray-400 mb-4">
                Username: {user.username}
              </h3>
            </div>
            <div className="mx-auto rounded-md">
              {userData?.following?.some(
                (item: any) => user._id === item._id,
              ) ? (
                <button
                  onClick={() => handleUnfollow(user.username)}
                  disabled={loadingUserId === user.username}
                  className="bg-red-400 text-white py-2 px-4 rounded-md font-semibold w-full"
                >
                  {loadingUserId === user.username ? 'Loading...' : 'Unfollow'}
                </button>
              ) : (
                <button
                  className="bg-[#877EFF] text-white font-semibold rounded-md py-2 px-4 w-full"
                  onClick={() => handleFollow(user.username)}
                  disabled={loadingUserId === user.username}
                >
                  {loadingUserId === user.username ? 'Loading...' : 'Follow'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleUsers < users?.length && (
        <div className="flex justify-center pt-10 pb-10">
          <button
            onClick={handleSeeMore}
            className="bg-[#877EFF] text-white font-semibold py-2 px-4 rounded-md"
          >
            See More
          </button>
        </div>
      )}
    </div>
  )
}

export default People
