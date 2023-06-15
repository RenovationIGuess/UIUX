import { Outlet } from 'react-router-dom'
import GuestNavbar from '../Navbar/GuestNavbar'
import "./styles/GuestLayout.scss";

const GuestLayout = () => {
  return (
    <>
      <GuestNavbar />
      <div className='guest-main'>
        <Outlet />
      </div>
    </>
  )
}

export default GuestLayout