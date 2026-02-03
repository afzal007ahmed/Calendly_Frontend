import { Route, Routes } from 'react-router'
import { routes } from '../Routes/routes'
import Home from '../Pages/Home'
import PageNotFound from '@/Pages/PageNotFound'

const RouteManager = () => {
  return (
    <Routes>
        <Route path={ routes.root } element={<Home/>}/>
        <Route path='*' element={<PageNotFound/>}  />
    </Routes>
  )
}

export default RouteManager