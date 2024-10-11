import { useRoutes } from 'react-router-dom'
import { SuspenseComponent as Suspense } from '../../utils'
import { lazy, LazyExoticComponent } from 'react'

const RegisterRoutes = () => {
  const Login: LazyExoticComponent<any> = lazy(() =>
    import('../../pages/register/login/Login'),
  )
  const SignUp: LazyExoticComponent<any> = lazy(() =>
    import('../../pages/register/signUp/SignUp'),
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
      }
  ])
}

export default RegisterRoutes
