import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import {
  useGetCommentPostIDQuery,
  useGetPostByUserAndIDQuery,
} from '../../../redux/api/user-slice'

const PostProfile = () => {
  const { id, username } = useParams()
  
  const {
    data: allComment,
    isLoading: isCommentsLoading,
  } = useGetCommentPostIDQuery(id)
  
  const {
    data: postData,
    isLoading: isPostLoading,
  } = useGetPostByUserAndIDQuery({ username, id })

  if (isPostLoading || isCommentsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ClipLoader color="#36d7b7" size={60} />
      </div>
    )
  }

  return (
    <div className="bg-black pt-[80px] pl-[30px] text-white p-4 h-screen overflow-y-auto">
      {postData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold">{postData.caption}</h3>
          <p className="text-gray-400">Location: {postData.location}</p>
          <p>{postData.owner}</p>
        </div>
      )}

      {allComment?.length > 0 ? (
        allComment.map((item: any, index: number) => (
          <div key={index} className="mb-4 p-2 border-b border-gray-700">
            <p className="text-lg">{item.message}</p>
            <p className="text-gray-400 text-sm">
              Comment created: {item.createdAt || 'Owner not found'}
            </p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  )
}

export default PostProfile
