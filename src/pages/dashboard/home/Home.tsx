import TopCreators from '../../../components/topCreators/TopCreators'
import { useGetFeedQuery } from '../../../redux/api/user-slice'

const Home = () => {
  const { data: feed } = useGetFeedQuery(true)
  console.log(feed)

  return (
    <div className="grid grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-9">
        <div>
          <h2 className="pt-[60px] pl-[53px] pr-[53px] text-white">
            Place for Story
          </h2>
          <div className="py-[54px] px-[53px]">
            <h2 className="font-bold text-white text-[30px]">Home Feed</h2>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-10 py-[40px] px-[40px]">
              {feed?.posts.map((post: any) => (
                <div
                  key={post._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={post.content[0]}
                    alt="Post"
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-white text-[20px] font-bold pb-[10px]">
                      {post.caption}
                    </h2>
                    <p className="text-gray-400"> Location : {post.location}</p>
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
