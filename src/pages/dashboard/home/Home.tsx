import { TopCreators } from '../../../components/topCreators/TopCreators'
import {
  useGetFeedQuery,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice'
import noImage from '../../../assets/images/noImage.jpg'

import PostCard from '../../../components/main/PostCard'
const Home = () => {
  const { data: feed } = useGetFeedQuery(true)
  const currentusername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const { data: userData } = useGetUserByUsernameQuery(currentusername)
  
  return (
    <div className="grid grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-9">
        <div className="">
          <div className="flex flex-wrap items-center pl-[53px] gap-5 pt-[60px] r">
            {userData?.following?.map((follow: any) => (
              <div key={follow._id}>
                <div className="flex flex-col items-center  rounded-full  w-[70px] h-[70px] p-2">
                  <img
                    className="w-[50px] border-[3px] border-[#877EFF] h-[50px] rounded-[20px] object-cover"
                    src={noImage}
                    alt="User"
                  />
                </div>
                <div className="">
                  <h3 className="text-white text-sm font-semibold pt-1 text-center">
                    {follow.username}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="py-[54px] px-[53px]">
            <h2 className="font-bold text-white text-[30px]">Home Feed</h2>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-10 py-[40px] px-[40px]">
              {feed?.posts?.map((post: any, index: number) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <TopCreators />
    </div>
  )
}

export default Home
