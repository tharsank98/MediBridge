import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const Logo = "/assets/MediBridge_logo.png"; // Logo from public folder

export const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const mobileMenu = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
      <ul className="text-center text-xl p-20">
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
          <Link to="/" onClick={() => setClick(false)}>
            Home
          </Link>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
          <Link to="/Doctors" onClick={() => setClick(false)}>
            Doctors
          </Link>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
          <Link to="/About" onClick={() => setClick(false)}>
            About
          </Link>
        </li>
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
          <Link to="/Contact" onClick={() => setClick(false)}>
            Contact
          </Link>
        </li>

        {/* Profile icon in mobile menu */}
        <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
          <Link to="/MyProfile" onClick={() => setClick(false)}>
            <PersonIcon className="text-white" />
            My Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white shadow-md">
      <div className="h-16 flex justify-between items-center px-10 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="MediBridge Logo" className="h-12 w-auto" />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-end flex-1">
          <ul className="flex gap-8 text-lg">
            <li>
              <Link
                to="/"
                className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Doctors"
                className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
              >
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/Pharmacy"
                className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
              >
                Pharmacy
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                className="py-2 px-4 hover:bg-blue-700 rounded cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile Image for Desktop */}
        <Link to="/MyProfile">
          <div className="hidden md:flex items-center ml-6">
            <PersonIcon className="text-white h-10 w-10 rounded-full border-2 border-white cursor-pointer hover:scale-105 transition" />
          </div>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center ml-auto">
          <button className="transition" onClick={handleClick}>
            {click ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {click && mobileMenu}
    </div>
  );
};
