import { useGetAllPostsQuery, useGetUserNameQuery } from "../../../redux/api/user-slice";
import noImage from "../../../assets/images/noImage.jpg";

const Profile = () => {
  const currentUsername = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData') as string).username
    : null;
  const { data } = useGetUserNameQuery(currentUsername);
  const { data: posts } = useGetAllPostsQuery(currentUsername);
  console.log(posts);

  return (
    <div className="h-screen overflow-y-auto bg-black text-white">
      <div className="max-w-[1050px] mx-auto rounded-2xl shadow-lg p-8 ">
          <div className="flex items-center gap-8 mb-[30px]">
          <div className="relative">
            <img
              onError={(e) => (e.currentTarget.src = noImage)}
              src={data?.avatar || '/default-avatar.png'}
              alt={data?.fullname}
              className="w-[160px] h-[160px] rounded-full object-cover border-4 border-gray-700 shadow-xl transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="text-left">
            {data?.fullName && (
              <h3 className="text-4xl font-bold mb-2 text-white">{data.fullName}</h3>
            )}
            {data?.username && (
              <p className="text-[#58A6FF] text-xl mb-4">
                <span className="font-medium">Username: @</span>{data.username}
              </p>
            )}
            {data?.email && (
              <p className="text-gray-400 text-sm">
                <span className="font-medium">Email:</span> {data.email}
              </p>
            )}
            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <p className="font-bold text-xl text-white">{data?.followers?.length || 0}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-white">{data?.following?.length || 0}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-3xl font-semibold mb-8">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts?.map((post: any, index: number) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4">
                <img
                  src={post?.content[0]?.url || noImage}
                  alt={post?.content_alt || "Post image"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white mb-2 truncate">
                    {post?.content_alt || 'Untitled'}
                  </h3>
                  <p className="text-gray-400 mb-1">Location: {post?.location || 'Unknown'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
