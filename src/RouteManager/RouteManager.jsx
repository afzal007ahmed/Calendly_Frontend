import { Route, Routes } from 'react-router'
import { routes } from '../Routes/routes'
import Home from '../Pages/Home'

const RouteManager = () => {
  return (
    <Routes>
        <Route path={ routes.root } element={<Home/>}/>
    </Routes>
  )
}

export default RouteManager