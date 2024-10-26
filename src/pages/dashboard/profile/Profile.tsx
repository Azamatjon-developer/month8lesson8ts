import {
  useGetAllPostsQuery,
  useGetUserNameQuery,
} from '../../../redux/api/user-slice';
import noImage from '../../../assets/images/noImage.jpg';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 

const Profile = () => {
  const currentUsername = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData') as string).username
    : null;

  const { data, isLoading: isUserLoading } = useGetUserNameQuery(currentUsername);
  const { data: posts, isLoading: isPostsLoading } = useGetAllPostsQuery(currentUsername);

  const isLoading = isUserLoading || isPostsLoading;

  return (
    <div className="h-screen overflow-y-auto bg-black text-white">
      <div className="w-full p-[40px] rounded-md shadow-lg pt-[60px] pl-[80px]">
        <div className="flex items-center gap-8 mb-[30px]">
          <div className="relative">
            {isLoading ? (
              <Skeleton circle height={160} width={160} />
            ) : (
              <img
                onError={(e) => (e.currentTarget.src = noImage)}
                src={data?.avatar || '/default-avatar.png'}
                alt={data?.fullName}
                className="w-[160px] h-[160px] rounded-full object-cover border-4 border-gray-700 shadow-xl transition-transform duration-300 hover:scale-110"
              />
            )}
          </div>
          <div className="text-left">
            {isLoading ? (
              <>
                <Skeleton height={36} width={200} className="mb-2" />
                <Skeleton height={18} width={150} className="mb-[20px]" />
                <Skeleton height={14} width={100} />
              </>
            ) : (
              <>
                {data?.fullName && (
                  <h3 className="text-[36px] font-bold mb-2 text-white">
                    {data.fullName}
                  </h3>
                )}
                {data?.username && (
                  <p className="text-[#7878A3] text-[18px] mb-[20px]">
                    <span className="font-medium">Username: @</span>
                    {data.username}
                  </p>
                )}
                {data?.email && (
                  <p className="text-gray-400 text-sm">
                    <span className="font-medium">Email:</span> {data.email}
                  </p>
                )}
              </>
            )}
            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <p className="font-bold text-xl text-white">
                  {isLoading ? <Skeleton width={50} /> : data?.followers?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-white">
                  {isLoading ? <Skeleton width={50} /> : data?.following?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-[30px] font-semibold mb-8">Posts</h2>
        <div className="grid grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg w-[90%] shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 shadow-lg">
                  <Skeleton height={200} className="rounded-lg" /> 
                  <div className="pt-[12px]">
                    <Skeleton height={24} width={150} className="mb-2" /> 
                    <Skeleton height={16} width={100} /> 
                  </div>
                </div>
              </div>
            ))
          ) : (
            posts?.map((post: any, index: number) => (
              <div
                key={index}
                className="rounded-lg w-[90%] shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 shadow-lg">
                  {post?.content[0]?.type === 'IMAGE' ? (
                    <img
                      src={post?.content[0]?.url || noImage}
                      alt={post?.content_alt || 'Post image'}
                      className="w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div>
                      <video controls src={post?.content[0]?.url}></video>
                    </div>
                  )}
                  <div className="pt-[12px]">
                    <h3 className="text-xl font-semibold text-white mb-2 truncate">
                      {post?.content_alt || 'Untitled'}
                    </h3>
                    <p className="text-gray-400 mb-1">
                      Location: {post?.location || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
