import { useGetUserNameQuery } from '../../../redux/api/user-slice';

const Profile = () => {
  const { data } = useGetUserNameQuery({});
  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-10">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-xl p-10">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-4">My Profile</h2>
          <p className="text-gray-400">Stay connected with your followers</p>
        </div>

        <div className="flex justify-between items-center space-x-10">
          {/* User Information */}
          <div className="flex-grow">
            <div className="text-left">
              {data?.fullName && (
                <h3 className="text-4xl font-semibold mb-2 text-white">{data.fullName}</h3>
              )}
              {data?.username && (
                <p className="text-gray-400 mb-4">
                  <span className="font-medium text-white">Username:</span> {data.username}
                </p>
              )}
              {data?.email && (
                <p className="text-gray-400 mb-4">
                  <span className="font-medium text-white">Email:</span> {data.email}
                </p>
              )}
              {data?.followers?.length && (
                <p className="text-white mb-4">
                  <span className="font-medium">Followers:</span> {data.followers.length}
                </p>
              )}
              {data?.following?.length && (
                <p className="text-white mb-4">
                  <span className="font-medium">Following:</span> {data.following.length}
                </p>
              )}
            </div>
            
          </div>

          <div className="relative group">
            <img
              src={data?.avatar || '/default-avatar.png'}
              alt="User Avatar"
              className="w-[200px] h-[200px] rounded-full object-cover border-4 border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
