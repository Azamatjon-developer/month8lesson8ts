import {TopCreators} from '../../../components/topCreators/TopCreators'
import {
  useGetFeedQuery,
  useGetUserByUsernameQuery,
} from '../../../redux/api/user-slice'
import noImage from '../../../assets/images/noImage.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { data: feed } = useGetFeedQuery(true)
  const currentusername =
    window.localStorage.getItem('user-data') !== null
      ? JSON.parse(window.localStorage.getItem('user-data') as string).username
      : null
  const navigate = useNavigate()
  const { data: userData } = useGetUserByUsernameQuery(currentusername)
  console.log(userData)
  return (
    <div className="grid grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-9">
        <div className="">
          <div className="flex flex-wrap items-center pl-[53px] gap-5 pt-[60px]">
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
                <div
                  key={index}
                  className="bg-gray-900 w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  {post?.content?.map((item: any) => {
                    if (item.type === 'IMAGE') {
                      return <img src={item.url} width={700} alt="Post Image" />
                    } else if (item.type === 'VIDEO') {
                      return (
                        <video width={800} controls>
                          <source src={item.url} type="video/mp4" />
                        </video>
                      )
                    }
                    return null
                  })}
                  <div onClick={()=> navigate("/postProfile")} className="p-4 cursor-pointer">
                    <h2 className="text-white text-[20px] font-bold pb-[10px]">
                      {post.caption}
                    </h2>
                    <p className="text-gray-400"> Location: {post.location}</p>
                  </div>
                </div>
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
