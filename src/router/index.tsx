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
      path: '/register',
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
    {
      path: '/',
      element: (
        <Suspense>
          <Home />
        </Suspense>
      ),

      children:[

        {
          path:"/explore",
          element:(
            <Suspense>
              <Explore/>
            </Suspense>
          )
        },
        {
          path:"/people",
          element:(
            <Suspense>
              <People/>
            </Suspense>
          )
        },
        {
          path:"/saved",
          element:(
            <Suspense>
              <Saved/>
            </Suspense>
          )
        },
        {
          path:"/reels",
          element:(
            <Suspense>
              <Reels/>
            </Suspense>
          )
        },
        {
          path:"/chats",
          element:(
            <Suspense>
              <Chats/>
            </Suspense>
          )
        },
        {
          path:"/createPosts",
          element:(
            <Suspense>
              <CreatePosts/>
            </Suspense>
          )
        },
        {
          path:"/logOut",
          element:(
            <Suspense>
              <LogOut/>
            </Suspense>
          )
        },
        {
          path:"/settings",
          element:(
            <Suspense>
              <Settings/>
            </Suspense>
          )
        }
      ]
    },
   
  ])
}

export default RegisterRoutes