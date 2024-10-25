import { useParams } from "react-router-dom"
import { useGetCommentPostIDQuery, useGetPostByUserAndIDQuery } from "../../../redux/api/user-slice"

const PostProfile = () => {
  const {id, username} = useParams()
  console.log(username)
  const {data:allComment} = useGetCommentPostIDQuery(id)
  console.log(allComment)
  const {data} = useGetPostByUserAndIDQuery({username, id})
  console.log(data)
  return (
    <div>
      <h2>Post Profile </h2>
    </div>
  )
}

export default PostProfile
