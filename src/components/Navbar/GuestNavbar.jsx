import { Link } from "react-router-dom"
import "./GuestNavbar.scss";
import image from "../../constant/image"

const GuestNavbar = () => {
  return (
    <nav className="flex justify-between px-10 py-2 fixed z-50 w-full">
      <div className="flex items-center">
        <img className="w-10 mr-4" src={image.kuru} alt="kururin" />
        <h1 className="nav-logo-title">Kurenda~</h1>
      </div>
      <div className="flex items-center gap-8">
        <Link to="/" className="navbar-title">
          Home
        </Link>
        <Link to="/" className="navbar-title">
          About Us
        </Link>
        <Link to="/" className="navbar-title">
          Pricing
        </Link>
        <Link to="/" className="navbar-title">
          Contact
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="navbar-title">
          Home
        </Link>
        <button className="flex items-center justify-center px-4 py-2 text-white bg-bright-green rounded-md hover:bg-less-bright-green">
          <Link to="/">
            Home
          </Link>
        </button>
      </div>
    </nav>
  )
}

export default GuestNavbar