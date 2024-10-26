import { TopCreators } from '../../../components/topCreators/TopCreators'
import {
  useGetFeedQuery,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice'
import noImage from '../../../assets/images/noImage.jpg'
import PostCard from '../../../components/main/PostCard'
import { ClipLoader } from 'react-spinners'
import Skeleton from 'react-loading-skeleton' 

const Home = () => {
  const { data: feed, isLoading: feedLoading } = useGetFeedQuery(true)
  const currentUsername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const { data: userData, isLoading: userLoading } = useGetUserByUsernameQuery(
    currentUsername,
  )

  if (feedLoading || userLoading) {
    return (
      <div className="flex flex-col items-center h-screen bg-black">
        <ClipLoader color="#877EFF" size={100} />
        <h3 className="text-white text-xl pl-3">Loading Home page ...</h3>
        <div className="flex flex-col items-center mt-10">
          <div className="flex flex-wrap items-center gap-5 pt-16">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton circle height={50} width={50} className="mb-2" />
                <Skeleton height={20} width={70} />
              </div>
            ))}
          </div>
          <div className="py-14 px-12">
            <Skeleton height={30} width={200} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 px-4 md:px-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg w-full shadow-lg">
                <Skeleton height={200} className="rounded-lg" /> 
                <div className="pt-3">
                  <Skeleton height={24} width={150} className="mb-2" /> 
                  <Skeleton height={16} width={100} /> 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-12 md:col-span-9">
        <div className="flex flex-wrap items-center pl-12 gap-5 pt-16">
          {userData?.following?.length > 0 ? (
            userData.following.map((follow: any) => (
              <div key={follow._id} className="flex flex-col items-center">
                <div className="flex flex-col items-center rounded-full w-[70px] h-[70px] p-2">
                  <img
                    className="w-[50px] h-[50px] border-3 border-[#877EFF] rounded-full object-cover"
                    src={follow?.avatar || noImage}
                    alt={follow?.username || 'User'}
                  />
                </div>
                <div className="text-center hidden md:block">
                  <h3 className="text-white text-sm font-semibold pt-1">
                    {follow.username}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No following users.</p>
          )}
        </div>

        <div className="py-14 px-4 md:px-12">
          <h2 className="font-bold text-white text-2xl md:text-3xl">Home Feed</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 px-4 md:px-10">
          {feed?.posts?.length > 0 ? (
            feed.posts.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            <p className="text-gray-400 text-lg">No posts available.</p>
          )}
        </div>
      </div>

      <div className="hidden md:block md:col-span-3">
        <TopCreators />
      </div>
    </div>
  )
}

export default Home
