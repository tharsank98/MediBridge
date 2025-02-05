import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from ".../"

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const content = (
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
      <ul className="text-center text-xl p-20">
        <Link spy={true} smooth={true} to="Home">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
            Home
          </li>
        </Link>
        <Link spy={true} smooth={true} to="Doctors">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
            Doctors
          </li>
        </Link>
        <Link spy={true} smooth={true} to="About">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
            About
          </li>
        </Link>
        <Link spy={true} smooth={true} to="Contact">
          <li className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
            Contact
          </li>
        </Link>
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

        {/* Navbar Links */}
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

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center ml-auto">
          <button className="transition" onClick={handleClick}>
            {click ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div>{click && content}</div>
    </div>
  );
};
