import Google from '../../../assets/images/Google.png';
import Snapgram from "../../../assets/images/Snap.svg";
import { useLoginMutation } from '../../../redux/api/user-slice';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../redux/slice/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../../../context/Context';
import toast from 'react-hot-toast';

const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataToJson = Object.fromEntries(formData);

    try {
      const res = await loginUser(formDataToJson).unwrap();
      dispatch(setToken(res.accessToken));
      dispatch(setUser(res.user));
      context?.setToken(res.accessToken);
      window.localStorage.setItem('userData', JSON.stringify(formDataToJson));

      toast.success(`Welcome my instagram, ${res.user.fullName}!`, {
        position: 'top-right',
      });

      navigate('/');
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Login failed';
      setError(errorMessage);

      toast.error(errorMessage, {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-black min-h-screen">
      <div className="pt-[80px] md:pt-[216px] px-6 md:pl-[177px] md:pr-[143px] w-full md:w-[50%]">
        <div className="flex items-center justify-center mb-[68px] gap-5">
          <img src={Snapgram} alt="Snapgram" />
          <h2 className="text-[#FFFFFF] font-bold text-[24px] md:text-[30px]">Snapgram</h2>
        </div>

        <div className="text-center mb-[32px]">
          <h2 className="text-[#FFFFFF] text-[24px] md:text-[30px]">Log in to your account</h2>
          <p className="text-[#7878A3]">Welcome back! Please enter your details.</p>
        </div>

        <form className="w-full max-w-[400px] flex flex-col gap-[20px] mx-auto" onSubmit={handleLogin}>
          <div>
            <label className="block text-[#EFEFEF] font-medium">Username</label>
            <input
              type="text"
              className="mt-1 w-full h-[48px] p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div>
            <label className="block text-[#EFEFEF] font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full h-[48px] p-3 rounded-md outline-none bg-[#1F1F22] text-white"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`bg-[#877EFF] text-[#FFFFFF] py-[13px] mb-[20px] w-full cursor-pointer font-semibold rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            <div className="flex items-center gap-[15px] justify-center pt-[12px] py-[13px] bg-white w-full">
              <img src={Google} alt="google" />
              <p className="text-[#1F1F22] font-semibold">Sign in with Google</p>
            </div>
          </div>

          <p className="text-[16px] text-[#EFEFEF] text-center">
            Don’t have an account?{' '}
            <a href="/" className="text-[#877EFF] font-semibold">
              Sign up
            </a>
          </p>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>

      <div className="hidden md:block w-[50%] bg-image"></div>
    </div>
  );
};

export default Login;
