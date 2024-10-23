import Google from '../../../assets/images/Google.png'
import { FormEvent } from 'react'
import { User } from '../../../types'
import { useRegisterMutation } from '../../../redux/api/user-slice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUp = () => {
  const navigate = useNavigate()
  const [createUser, { isLoading }] = useRegisterMutation()

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const full_name = formData.get('name') as string
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const data: User = {
      full_name,
      email,
      username,
      password,
      photo: null,
    }

    try {
      const res = await createUser(data).unwrap()
      toast.success(`User ${res.full_name} created successfully!`, {
        position: 'top-right',
      })
      navigate('/login')
    } catch (err) {
      const errorMessage = (err as any)?.data?.message || 'Registration failed.'
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
      })
    }
  }

  return (
    <div className=" flex justify-center bg-black  ">
      <div className=" w-[50%] pt-[218px] pl-[177px] pb-[216px] pr-[143px]">
        <div>
          <h2 className="text-[30px] font-bold pt-[12px] pb-[32px] text-white text-center">
            Create a new account
          </h2>
          <p className="text-[#7878A3] text-center pv-[32px] text-[16px]">
            To use snapgram, Please enter your details.
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="w-[400px] mx-auto flex flex-col gap-[20px]"
        >
          <div className="placeholder:bg-black">
            <label className="block text-[#EFEFEF] font-medium"> Name</label>
            <input
              type="text"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your name"
              name="name"
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium"> Email</label>
            <input
              type="email"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your email"
              name="email"
            />
          </div>
          <div>
            <label className="block text-[#EFEFEF] font-medium">
              {' '}
              Username{' '}
            </label>
            <input
              type="text"
              className="w-[400px] h-[48px] mt-[20px] p-3 rounded-sm outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your username"
              name="username"
            />
          </div>
          <div>
            <label className="block text-[#EFEFEF] font-medium">
              {' '}
              Password{' '}
            </label>
            <input
              type="password"
              className="mt-1 w-[400px] h-[48px] p-3 rounded-sm outline-none  bg-[#1F1F22] text-white mb-[20px]"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <div>
            <button className="bg-[#877EFF] text-[#FFFFFF] py-[13px] mb-[20px] w-[400px] cursor-pointer font-semibold rounded-md">
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
            <div className="flex items-center mb-[20px] gap-[15px] justify-center pt-[12px] py-[13px] bg-white w-[400px]">
              <img src={Google} alt="google" />
              <p className="text-[#1F1F22] font-semibold  ">
                {' '}
                Sign up with Google
              </p>
            </div>
          </div>
          <p className="text-[16px] text-[#EFEFEF] text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#877EFF] font-semibold">
              Log in
            </a>
          </p>
        </form>
      </div>

      <div className="w-[50%] bg-image"></div>
    </div>
  )
}

export default SignUp
