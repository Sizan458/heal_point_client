import { NavLink, useNavigate } from "react-router";
import { assets } from "../assets/assets";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", name: "HOME" },
    { path: "/doctors", name: "ALL DOCTORS" },
    { path: "/about", name: "ABOUT" },
    { path: "/contact", name: "CONTACT" },
  ];

  return (
    <nav className="flex items-center justify-between py-4 px-5 md:px-10 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className="w-36 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
        {navLinks.map(({ path, name }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `group relative pb-1 transition-all ${
                isActive ? "text-primary font-semibold" : "hover:text-primary"
              }`
            }
          >
            {name}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={userData.image || assets.default_profile}
                alt="profile"
                className="w-9 h-9 rounded-full border border-gray-300 object-cover"
              />
              <img src={assets.dropdown_icon} alt="dropdown" className="w-3" />
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-20">
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                >
                  My Appointments
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-primary text-white py-2 px-6 rounded-full hidden md:block hover:bg-primary/90 transition"
            onClick={() => navigate("/login")}
          >
            Create an account
          </button>
        )}

        {/* Mobile menu button */}
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-7 lg:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg z-30 transform transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-6 border-b">
          <img src={assets.logo} alt="logo" className="w-32" />
          <img
            src={assets.cross_icon}
            alt="close"
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-4 mt-6 px-6 text-lg font-medium text-gray-700">
          {navLinks.map(({ path, name }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setShowMenu(false)}
              className="hover:text-primary"
            >
              {name}
            </NavLink>
          ))}

          {!token && (
            <button
              className="mt-4 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary/90 transition cursor-pointer"
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
            >
              Create an account
            </button>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
