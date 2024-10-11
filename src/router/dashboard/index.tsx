import { useRoutes } from "react-router-dom"
import { SuspenseComponent as Suspense } from "../../utils"
import { lazy, LazyExoticComponent } from "react"

const Home:LazyExoticComponent<any> = lazy(() => import('../../pages/dashboard/home/Home'))

export const DashboardRoutes = () => {
    return useRoutes([{
        path: '/',
        element: <Suspense><Home/></Suspense>
    }])
}