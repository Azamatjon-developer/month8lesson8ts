import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice'
import userIcon from '../../../assets/images/UsersIcon.svg'
const People = () => {
  const { data: users } = useGetAllUsersQuery({})
  const [followUser] = useFollowMutation()
  const [unfollowUser] = useUnfollowMutation()
  const currentUsername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const { data: userData } = useGetUserByUsernameQuery(currentUsername)
  console.log(users)
  return (
    <div className="bg-[#000000] pt-[80px] pl-[60px] h-screen overflow-y-auto">
      <div className="flex items-center gap-4 text-white mb-8">
        <img className="w-[50px]" src={userIcon} alt="Users Icon" />
        <h2 className="text-[36px]">All users</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user: any) => (
          <div
            key={user._id}
            className="w-[303px] h-[300px] border border-slate-500 p-5 rounded-lg shadow-lg text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Name: {user.fullName}
              </h2>
              <h3 className="text-lg text-gray-400 mb-4">
                Username and : {user.username}
              </h3>
            </div>
            <div className='mx-auto rounded-md '>
              {userData?.following?.some(
                (item: any) => user._id === item._id,
              ) ? (
                <button
                  onClick={() => unfollowUser(user.username)}
                  className="bg-red-400 text-white  pt-[10px] pb-[10px] pl-[33px] pr-[33px] rounded-md font-semibold"
                >
                  unfollow
                </button>
              ) : (
                <button
                  className="bg-[#877EFF] text-white font-semibold  rounded-md pt-[10px] pb-[10px] pl-[33px] pr-[33px]"
                  onClick={() => followUser(user.username)}
                >
                  follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default People
