import SignUpImage from '../../../assets/images/SignUpLeft.png'
import Google from '../../../assets/images/Google.png'
import Snapgram from "../../../assets/images/Snap.svg"
import { useLoginMutation } from '../../../redux/api/user-slice'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '../../../redux/slice/auth-slice'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../../context/Context'

const Login = () => {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context)

  return  (
    <div className="flex items-center bg-black">
      <div className=" pt-[216px] pl-[177px] pb-[216px] pr-[143px] w-[40%]">
          <div className='flex items-center justify-center mb-[68px] gap-5'>
            <img src={Snapgram} alt="Snapgram" />
            <h2 className='text-[#FFFFFF] font-bold text-[30px]'>Snapgram</h2>
          </div>

          <div className='text-center mb-[32px]'>
            <h2 className='text-[#FFFFFF] text-[30px]'>Log in to your account</h2>
            <p className='text-[#7878A3]'>Welcome back! Please enter your details.</p>
          </div>
      
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const formDataToJson = Object.fromEntries(formData)
          loginUser(formDataToJson).unwrap().then((res) => {
            dispatch(setToken(res.accessToken))
            dispatch(setUser(res.user));
            context?.setToken(res.accessToken)
            navigate('/')
          })
          window.localStorage.setItem('userData', JSON.stringify(formDataToJson))
          console.log(formDataToJson)
        }}>

          <div className="placeholder:bg-black">
            <label className="block text-[#EFEFEF] font-medium"> Username</label>
            <input
              type="text"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your username"
              name='username'
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium"> Password</label>
            <input
              type="password"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          
          <div>
            <button className="bg-[#877EFF] text-[#FFFFFF] py-[13px] mb-[20px] w-[400px] cursor-pointer font-semibold rounded-md">
              Login 
            </button>
            <div className="flex items-center gap-[15px] justify-center pt-[12px] py-[13px] bg-white w-[400px]">
              <img src={Google} alt="google" />
              <p className="text-[#1F1F22] font-semibold "> Sign in with Google</p>
            </div>
          </div>
          <p className="text-[16px] text-[#EFEFEF] text-center">
          Don’t have an account?{' '}
            <a
              href="/"
              className="text-[#877EFF] font-semibold"
            >
              Sign up 
            </a>
          </p>
        </form>
      </div>
      <div className="w-[60%]">
        <img
          className="w-full h-[100vh]"
          src={SignUpImage}
          alt="signUp image"
        />
      </div>
    </div>
  )
}

export default Login
