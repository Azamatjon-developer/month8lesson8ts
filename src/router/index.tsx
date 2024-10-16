import { useRoutes } from 'react-router-dom'
import { SuspenseComponent as Suspense } from '../utils'
import { lazy, LazyExoticComponent } from 'react'
import Home from '../pages/dashboard/home/Home'
import Explore from '../pages/dashboard/explore/Explore'
import People from '../pages/dashboard/people/People'
import Saved from '../pages/dashboard/saved/Saved'
import Reels from '../pages/dashboard/reels/Reels'
import Chats from '../pages/dashboard/chats/Chats'
import CreatePosts from '../pages/dashboard/createPost/CreatePosts'
import LogOut from '../pages/dashboard/logOut/LogOut'
import Settings from '../pages/dashboard/settings/Settings'

const RegisterRoutes = () => {
  const Login: LazyExoticComponent<any> = lazy(() =>
    import('../pages/register/login/Login'),
  )
  const SignUp: LazyExoticComponent<any> = lazy(() =>
    import('../pages/register/signUp/SignUp'),
  )

  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense>
          <SignUp />
        </Suspense>
      ),
    },
    {
      path: '/login',
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },

   
  ])
}

export default RegisterRoutes