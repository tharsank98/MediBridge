import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Logo = "/assets/MediBridge_logo.png"; 

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setClick(!click);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
    setProfileDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Hide Navbar Links & Profile on Login Page
  const isLoginPage = location.pathname === "/login" || location.pathname === "/forgot-password";

  return (
    <div className="bg-slate-900 text-white shadow-md relative z-30">
      <div className="h-16 flex justify-between items-center px-5 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="MediBridge Logo" className="h-12 w-auto" />
        </div>

        {/* ✅ Hide Everything Else on Login Page */}
        {!isLoginPage && (
          <>
            {/* Desktop Navbar */}
            <div className="hidden md:flex items-center justify-end flex-1">
              <ul className="flex gap-8 text-lg">
                {[
                  { name: "Home", path: "/" },
                  { name: "Doctors", path: "/Doctors" },
                  { name: "Pharmacy", path: "/Pharmacy" },
                  { name: "Contact", path: "/Contact" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`py-2 px-4 rounded cursor-pointer ${location.pathname === item.path ? "text-white underline decoration-[#3cbece] decoration-2 underline-offset-4" : "hover:bg-[#3cbece]"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Icon & Dropdown */}
            <div className="relative hidden md:flex items-center ml-6">
              <div
                className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <PersonIcon className="text-white" />
              </div>

              {/* Dropdown Menu */}
              {profileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-40" ref={dropdownRef}>
                  <ul className="py-2">
                    <li>
                      <Link to="/MyProfile" className="flex items-center px-4 py-2 hover:bg-[#3cbece]" onClick={() => setProfileDropdown(false)}>
                        <PersonIcon className="mr-2" />
                        View My Profile
                      </Link>
                    </li>
                    <li onClick={handleLogout} className="cursor-pointer flex items-center px-4 py-2 hover:bg-[#3cbece]">
                      <LogoutIcon className="mr-2" />
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center ml-auto">
              <button className="transition" onClick={handleClick}>
                {click ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {!isLoginPage && click && (
        <>
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-20" onClick={() => setClick(false)}></div>

          {/* Mobile Navigation Menu */}
          <div className="lg:hidden fixed top-16 w-full left-0 right-0 bg-slate-900 transition z-30">
            <ul className="text-center text-xl p-10">
              {[
                { name: "Home", path: "/" },
                { name: "Doctors", path: "/Doctors" },
                { name: "Pharmacy", path: "/Pharmacy" },
                { name: "Contact", path: "/Contact" },
                { name: "My Profile", path: "/MyProfile", icon: <PersonIcon className="text-white mr-2" /> },
              ].map((item) => (
                <li key={item.path} className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
                  <Link to={item.path} onClick={() => setClick(false)}>
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
              <li onClick={() => { handleLogout(); setClick(false); }} className="my-4 py-4 border-b border-slate-800 hover:bg-blue-700 hover:rounded cursor-pointer">
                <LogoutIcon className="text-white mr-2" />
                Log Out
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
