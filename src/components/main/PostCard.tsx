import like from '../../assets/images/LikeIcon.svg';
import comment from '../../assets/images/CommentIcon.svg';
import share from '../../assets/images/ShareIcon.svg';
import send from '../../assets/images/SendIcon.svg';
import noImage from '../../assets/images/noImage.jpg';
import { useNavigate } from 'react-router-dom';
import heart from "../../assets/images/hear.svg"
import { useState } from 'react';
import { usePostLikesMutation, usePostCommentsMutation } from '../../redux/api/user-slice';

const PostCard = ({ post }: any) => {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [likePost] = usePostLikesMutation();
  const [postComment] = usePostCommentsMutation(); // Mutation for posting comments
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLikePost = (postId: string) => {
    likePost(postId)
      .unwrap()
      .then(() => {
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      postComment({ postId: post._id, text: commentText.trim() }) // API call
        .unwrap()
        .then(() => {
          setCommentText(''); // Clear the input after submitting
        })
        .catch((error) => {
          console.error('Error submitting comment:', error);
        });
    }
  };

  // Function to handle the Enter key press for submitting the comment
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
    <div className="bg-gray-900 w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div onClick={() => navigate('/postProfile')} className="p-4 cursor-pointer">
        <h2 className="text-white text-[20px] font-bold pb-[10px]">{post.caption}</h2>
        <p className="text-gray-400">Location: {post.location}</p>
      </div>

      {post?.content?.map((item: any) => {
        if (item.type === 'IMAGE') {
          return <img src={item.url} width={700} alt="Post Image" key={item.url} />;
        } else if (item.type === 'VIDEO') {
          return (
            <video width={800} controls key={item.url}>
              <source src={item.url} type="video/mp4" />
            </video>
          );
        }
        return null;
      })}

      <div className="pt-[20px] pb-[20px] pl-[20px] flex items-center gap-[20px]">
        <div onClick={() => handleLikePost(post._id)} className="flex gap-[5px] cursor-pointer">
          <img
            src={isLiked ? like : heart} 
            alt="like"
            className="cursor-pointer"
          />
          <span className="text-white">{likeCount}</span>
        </div>

        <img src={share} alt="share" className="cursor-pointer" />
        <img src={comment} alt="comment" className="cursor-pointer" />
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
            onKeyPress={handleKeyPress} // Handle Enter key for submission
            className="w-[530px] pt-[12px] pb-[12px] p-3 outline-none bg-[#101012] text-[#5C5C7B] rounded-md"
            type="text"
            placeholder="Write your comment"
          />
          <button 
            onClick={handleCommentSubmit} 
            className="absolute left-[455px] cursor-pointer"
          >
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
