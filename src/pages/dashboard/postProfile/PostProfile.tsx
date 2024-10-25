import { useParams } from "react-router-dom"
import { useGetCommentPostIDQuery, useGetPostByUserAndIDQuery } from "../../../redux/api/user-slice"

const PostProfile = () => {
  const {id, username} = useParams()
  const {data:allComment} = useGetCommentPostIDQuery(id)
  console.log(allComment)
  const {data} = useGetPostByUserAndIDQuery({username, id})
  console.log(data)
  return (
    <div>
      {allComment?.map((item:any,index:number)=> (
        <div key={index}>
          <p>{item.content}</p>
          <h3>{item.username}</h3>
          <h3>{item.createdAt}</h3>
          <hr/>
        </div>
      ))}
      <h2>Post Profile </h2>
    </div>
  )
}

export default PostProfile
