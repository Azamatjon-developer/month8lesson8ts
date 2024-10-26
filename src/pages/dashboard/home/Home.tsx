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
          <div className="flex flex-wrap items-center gap-5 pt-[60px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton circle height={50} width={50} className="mb-2" />
                <Skeleton height={20} width={70} />
              </div>
            ))}
          </div>
          <div className="py-[54px] px-[53px]">
            <Skeleton height={30} width={200} />
          </div>
          <div className="grid grid-cols-1 gap-10 py-[40px] px-[40px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg w-full shadow-lg">
                <Skeleton height={200} className="rounded-lg" /> 
                <div className="pt-[12px]">
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
    <div className="grid grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-9">
        <div className="flex flex-wrap items-center pl-[53px] gap-5 pt-[60px]">
          {userData?.following?.length > 0 ? (
            userData.following.map((follow: any) => (
              <div key={follow._id}>
                <div className="flex flex-col items-center rounded-full w-[70px] h-[70px] p-2">
                  <img
                    className="w-[50px] border-[3px] border-[#877EFF] h-[50px] rounded-[20px] object-cover"
                    src={follow?.avatar || noImage}
                    alt={follow?.username || 'User'}
                  />
                </div>
                <div className="text-center">
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

        <div className="py-[54px] px-[53px]">
          <h2 className="font-bold text-white text-[30px]">Home Feed</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 py-[40px] px-[40px]">
          {feed?.posts?.length > 0 ? (
            feed.posts.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            <p className="text-gray-400 text-lg">No posts available.</p>
          )}
        </div>
      </div>
      <TopCreators />
    </div>
  )
}

export default Home
