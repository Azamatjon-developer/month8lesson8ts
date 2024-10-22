import { useParams } from 'react-router-dom'
import { useGetUserByUsernameQuery } from '../../../redux/api/user-slice'
import noImage from '../../../assets/images/noImage.jpg'

const Users = () => {
  const { username } = useParams()
  const { data: user } = useGetUserByUsernameQuery(username)
  console.log(user)
  return (
    <div className="bg-black h-screen overflow-y-auto pt-[60px] pl-[80px]">
      <div className="flex items-center gap-[40px]">
        <div>
          <img
            onError={(e) => (e.currentTarget.src = noImage)}
            src={user?.avatar || '/default-avatar.png'}
            alt={user?.fullname}
            className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-600 shadow-lg transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="">
          {user?.fullName && (
            <h3 className="text-[36px]  font-semibold mb-[10px] text-white">
              {user.fullName}
            </h3>
          )}
          {user?.username && (
            <p className="text-[#7878A3] text-[18px] mb-[22px]">
              <span className="font-medium">Username: @</span>
              {user.username}
            </p>
          )}
          {user?.email && (
            <p className="text-gray-400 text-sm">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          )}
          <div className="flex items-center gap-[40px]">
            <div className="text-center">
              <p className="font-bold text-lg text-white">
                {user?.followers?.length || 0}
              </p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-white">
                {user?.following?.length || 0}
              </p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <h2 className='text-white text-[32px] mt-[40px]'>Posts</h2>
        {user?.posts?.map((post: any) => (
          <div
            key={post._id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-white">{post.username}</h3>
              <p className="text-gray-400 mb-2">{post.content_alt}</p>
              <p className="text-sm text-gray-500">{post.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
