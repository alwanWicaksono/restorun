import NavBar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return(
    <div style={{marginTop: '100px'}}>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Layout;