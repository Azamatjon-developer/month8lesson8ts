import like from '../../assets/images/LikeIcon.svg'
import comment from '../../assets/images/CommentIcon.svg'
import share from '../../assets/images/ShareIcon.svg'
import send from '../../assets/images/SendIcon.svg'
import noImage from '../../assets/images/noImage.jpg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const PostCard = ({ post }: any) => {
  const navigate = useNavigate()
  const [commentText, setCommentText] = useState('')

  console.log(commentText)

  return (
    <div className="bg-gray-900 w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div
        onClick={() => navigate('/postProfile')}
        className="p-4 cursor-pointer"
      >
        <h2 className="text-white text-[20px] font-bold pb-[10px]">
          {post.caption}
        </h2>
        <p className="text-gray-400"> Location: {post.location}</p>
      </div>

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
      <div className="pt-[20px] pb-[20px] pl-[20px] flex items-center gap-[20px]">
        <img src={like} alt="like" />
        <img src={comment} alt="comment" />
        <img src={share} alt="share" />
      </div>
      <div className="flex items-center gap-3 mb-[20px] pl-[20px]">
        <img
          className="w-[50px] border-[3px] border-[#877EFF] h-[50px] rounded-[20px] object-cover"
          src={noImage}
          alt="User"
        />
        <div className="flex items-center justify-between gap-5 relative">
          <input
            value={commentText}
            name="comment"
            onChange={(e) => setCommentText(e.target.value)}
            className="w-[491px] pt-[12px] pb-[12px] p-3 outline-none bg-[#101012] text-[#5C5C7B]  rounded-md"
            type="text"
            placeholder="Write your comment"
          />
          <img className="absolute left-[455px]" src={send} alt="send" />
        </div>
      </div>
    </div>
  )
}

export default PostCard
