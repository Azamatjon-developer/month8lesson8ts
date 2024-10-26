import { useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery, useGetAllPostsQuery } from '../../../redux/api/user-slice';
import noImage from '../../../assets/images/noImage.jpg';
import Skeleton from 'react-loading-skeleton';

const Users = () => {
  const { username } = useParams();
  const { data: user, isLoading: userLoading } = useGetUserByUsernameQuery(username);
  const { data: posts, isLoading: postsLoading } = useGetAllPostsQuery(username);

  const isLoading = userLoading || postsLoading;

  return (
    <div className="bg-black h-screen overflow-y-auto pt-[60px] pl-[80px] md:pl-[40px] sm:pl-[20px]">
      <div className="flex flex-col md:flex-row items-center gap-[40px]">
        <div>
          {isLoading ? (
            <Skeleton className="w-[150px] h-[150px] rounded-full" />
          ) : (
            <img
              onError={(e) => (e.currentTarget.src = noImage)}
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.fullname}
              className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-600 shadow-lg transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>
        <div>
          {isLoading ? (
            <Skeleton className="h-[36px] mb-[10px] w-[200px]" />
          ) : user?.fullName && (
            <h3 className="text-[36px] font-semibold mb-[10px] text-white">
              {user.fullName}
            </h3>
          )}
          {isLoading ? (
            <Skeleton className="h-[20px] mb-[22px] w-[150px]" />
          ) : user?.username && (
            <p className="text-[#7878A3] text-[18px] mb-[22px]">
              <span className="font-medium">Username: @</span>
              {user.username}
            </p>
          )}
          {isLoading ? (
            <Skeleton className="h-[20px] w-[150px]" />
          ) : user?.email && (
            <p className="text-gray-400 text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
          <div className="flex flex-col md:flex-row items-center gap-[40px] mt-4">
            <div className="text-center">
              {isLoading ? (
                <Skeleton className="h-[24px] w-[40px]" />
              ) : (
                <p className="font-bold text-lg text-white">
                  {user?.followers?.length || 0}
                </p>
              )}
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              {isLoading ? (
                <Skeleton className="h-[24px] w-[40px]" />
              ) : (
                <p className="font-bold text-lg text-white">
                  {user?.following?.length || 0}
                </p>
              )}
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[40px] mb-[40px] p-5">
        <h2 className="text-white text-[32px]">Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[20px]">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-[315px] rounded-md" />
            ))
          ) : posts?.length ? (
            posts.map((item: any, inx: number) => {
              const firstPost = item?.content[0]?.url;
              const firstPostType = item?.content[0]?.type || "IMAGE";
              return (
                <div
                  key={inx}
                  className="col-span-1 rounded-md transition-all group overflow-hidden relative"
                >
                  <div
                    className="absolute flex flex-col justify-end top-0 left-0 right-0 bottom-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, #171717 109.15%)`,
                    }}
                  >
                    <div className="p-4">
                      <h3 className="font-bold text-white">{item.caption}</h3>
                      <h3 className="text-[16px] text-[#7878A3]">
                        {item.content_alt}
                      </h3>
                    </div>
                  </div>
                  {firstPostType === "IMAGE" && (
                    <img
                      className="w-full group-hover:scale-110 duration-300 h-[315px] object-cover"
                      src={firstPost || noImage}
                      alt={item.caption}
                    />
                  )}
                  {firstPostType === "VIDEO" && (
                    <video
                      className="w-full h-[315px] object-cover group-hover:scale-110 duration-300"
                      src={firstPost}
                      controls
                    ></video>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-white text-3xl font-semibold opacity-70 col-span-full">
              No posts available...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
