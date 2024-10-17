import {
  useFollowMutation,
  useGetAllUsersQuery,
  useGetUserByUsernameQuery,
  useUnfollowMutation,
} from '../../redux/api/user-slice'

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true)
  const [followUser] = useFollowMutation()
  const [unfollowUser] = useUnfollowMutation()
  const currentusername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const { data: userData } = useGetUserByUsernameQuery(currentusername)
  const handleFollowUser = (username: string): void => {
    followUser(username)
  }
  const handleUnfollowUser = (username: string): void => {
    unfollowUser(username)
  }

  return (
    <div className="col-span-3 text-white">
      <div className="text-[#ffffff]  text-[24px] pt-[48px] pl-[24px] pr-[24px] pb-[40px]">
        <h2>TopCreators</h2>
      </div>
      <div className="flex">
        <div className="grid grid-cols-12">
          {data?.map((user: any) => (
            <div className="col-span-6 " key={user._id}>
              <div className="border flex flex-col gap-[44px] mb-[24px] border-slate-500 w-[190px] h-[190px] rounded-lg pt-[24px] pl-[34px] pr-[34px] pb-[24px] text-center ">
                <h2 className="font-semibold text-[16px] text-white pb-[10px]">
                  {user.username}
                </h2>
                {userData?.following?.some(
                  (item: any) => item.username === user.username,
                ) ? (
                  <button
                    className="bg-red-500 rounded-md pt-[8px] pb-[8px] pl-[18px] pr-[18px] font-semibold"
                    onClick={() => handleUnfollowUser(user.username)}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    className="bg-[#877EFF] rounded-md pt-[8px] pb-[8px] pl-[18px] pr-[18px] font-semibold"
                    onClick={() => handleFollowUser(user.username)}
                  >
                    follow
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
