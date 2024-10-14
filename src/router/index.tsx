import { useRoutes } from 'react-router-dom'
import { SuspenseComponent as Suspense } from '../utils'
import { lazy, LazyExoticComponent } from 'react'
import Home from '../pages/dashboard/home/Home'

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
      element: <Suspense><Home/></Suspense>
  },
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
      }
  ])
}

export default RegisterRoutes
