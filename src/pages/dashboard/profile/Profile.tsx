import { useGetUserNameQuery } from "../../../redux/api/user-slice";
import noImage from "../../../assets/images/noImage.jpg"
const Profile = () => {
  const currentUsername = window.localStorage.getItem('userData') 
    ? JSON.parse(window.localStorage.getItem('userData') as string).username 
    : null;
  const { data } = useGetUserNameQuery(currentUsername);

  return (
    <div className="h-screen overflow-y-auto bg-black text-white">
      <div className="max-w-4xl rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-[32px] mb-[100px]">
          <div className="relative">
            <img
              onError={(e)=> e.currentTarget.src = noImage}
              src={data?.avatar || '/default-avatar.png'}
              alt={data?.fullname}
              className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-600 shadow-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          
          <div className="text-center">
            {data?.fullName && (
              <h3 className="text-[36px]  font-semibold mb-[10px] text-white">{data.fullName}</h3>
            )}
            {data?.username && (
              <p className="text-[#7878A3] text-[18px] mb-[22px]">
                <span className="font-medium">Username:  @</span>{data.username}
              </p>
            )}
            {data?.email && (
              <p className="text-gray-400 text-sm">
                <span className="font-medium">Email:</span> {data.email}
              </p>
            )}
            <div className="flex items-center gap-[40px]">
              <div className="text-center">
                <p className="font-bold text-lg text-white">{data?.followers?.length || 0}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-white">{data?.following?.length || 0}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-white text-3xl font-semibold mb-6">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.posts?.map((post: any) => (
            <div 
              key={post._id} 
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{}</h3>
                <p className="text-gray-400 mb-2">{post.content_alt}</p>
                <p className="text-sm text-gray-500">{post.location}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
