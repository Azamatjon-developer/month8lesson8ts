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
    <div className="flex flex-col md:flex-row justify-center bg-black min-h-screen">
      <div className="w-full md:w-1/2 pt-20 px-4 md:px-20 lg:px-32">
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create a new account</h2>
          <p className="text-[#7878A3] text-center mb-8 text-lg">
            To use Snapgram, please enter your details.
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md mx-auto flex flex-col gap-5"
        >
          <div>
            <label className="block text-[#EFEFEF] font-medium">Name</label>
            <input
              type="text"
              className="mt-1 w-full h-12 p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your name"
              name="name"
              required
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full h-12 p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium">Username</label>
            <input
              type="text"
              className="mt-1 w-full h-12 p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full h-12 p-3 rounded-md outline-none bg-[#1F1F22] text-white mb-5"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <div>
            <button className="bg-[#877EFF] text-[#FFFFFF] py-3 mb-5 w-full cursor-pointer font-semibold rounded-md">
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
            <div className="flex items-center mb-5 gap-3 justify-center py-3 bg-white w-full rounded-md">
              <img src={Google} alt="google" className="h-5" />
              <p className="text-[#1F1F22] font-semibold">Sign up with Google</p>
            </div>
          </div>

          <p className="text-lg text-[#EFEFEF] text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#877EFF] font-semibold">
              Log in
            </a>
          </p>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 bg-image h-full"></div>
    </div>
  )
}

export default SignUp
