import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice';
import userIcon from '../../../assets/images/UsersIcon.svg';

const People = () => {
  const { data: users, refetch } = useGetAllUsersQuery({});
  
  const [followUser, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unfollowUser, { isLoading: isUnfollowLoading }] = useUnfollowMutation();

  const currentUsername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null;

  const { data: userData } = useGetUserByUsernameQuery(currentUsername);

  const handleFollow = async (userId: string, isFollowing: boolean): Promise<void> => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      refetch();
    } catch (error) {
      console.error('Failed to follow/unfollow user', error);
    }
  };

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
            className="w-[430px] h-[300px] border border-slate-500 p-5 rounded-lg shadow-lg text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">Name: {user.fullName}</h2>
              <h3 className="text-lg text-gray-400 mb-4">Username and : {user.username}</h3>
            </div>

            <button
              className={`rounded-md pt-[10px] pb-[10px] transition-all ${
                user.isFollowing
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#877EFF] hover:bg-[#6C64E8]'
              }`}
              onClick={() => handleFollow(user._id, user.isFollowing)}
              disabled={isFollowLoading || isUnfollowLoading}
            >
              {(isFollowLoading || isUnfollowLoading) && user._id === userData?.id
                ? 'Processing...'
                : user.isFollowing
                ? 'Unfollow'
                : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
