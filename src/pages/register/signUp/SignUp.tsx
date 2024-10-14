import SignUpImage from '../../../assets/images/SignUpLeft.png'
import Google from '../../../assets/images/Google.png'
const SignUp = () => {
  return (
    <div className="flex items-center bg-black">
      <div className=" pt-[216px] pl-[177px] pb-[216px] pr-[143px] w-[40%]">
        <h2 className="text-[30px] font-bold pt-[12px] pb-[32px] text-white text-center">
          Create a new account
        </h2>
        <p className="text-[#7878A3] text-center pv-[32px] text-[16px]">
          To use snapgram, Please enter your details.
        </p>
        <form className="space-y-6">
          <div className="placeholder:bg-black">
            <label className="block text-[#EFEFEF] font-medium"> Name</label>
            <input
              type="text"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium"> Email</label>
            <input
              type="email"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-[#EFEFEF] font-medium">
              {' '}
              Username{' '}
            </label>
            <input
              type="text"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-[#EFEFEF] font-medium">
              {' '}
              Password{' '}
            </label>
            <input
              type="password"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <button className="bg-[#877EFF] text-[#FFFFFF] py-[13px] mb-[20px] w-[400px] cursor-pointer font-semibold rounded-md">
              Sign Up
            </button>
            <div className="flex items-center gap-[15px] justify-center pt-[12px] py-[13px] bg-white w-[400px]">
              <img src={Google} alt="google" />
              <p className="text-[#1F1F22] font-semibold "> Sign up with Google</p>
            </div>
          </div>
          <p className="text-[16px] text-[#EFEFEF] text-center">
            Don't have an account??{' '}
            <a
              href="/login"
              className="text-[#877EFF] font-semibold"
            >
              Log in
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

export default SignUp
