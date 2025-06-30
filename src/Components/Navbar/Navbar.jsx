import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import Login from "../LoginForm/Login";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("https://event-server-nu-lyart.vercel.app/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 px-6 py-4 flex items-center justify-between
      bg-transparent md:bg-transparent
      bg-white md:bg-transparent
      md:text-white text-black"
    >
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/yF3Vh1Xy/logo.png"
          alt="logo"
          className="w-60 h-auto"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-semibold text-sm">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-white hover:text-indigo-300"
            }
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-white hover:text-indigo-300"
            }
          >
            EVENTS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addEvent"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-white hover:text-indigo-300"
            }
          >
            ADD EVENT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/myEvent"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-bold"
                : "text-white hover:text-indigo-300"
            }
          >
            MY EVENT
          </NavLink>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden focus:outline-none text-black"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white flex flex-col text-black font-semibold text-sm md:hidden">
          <li className="border-b border-gray-300 px-4 py-3">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="border-b border-gray-300 px-4 py-3">
            <NavLink
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              EVENTS
            </NavLink>
          </li>
          <li className="border-b border-gray-300 px-4 py-3">
            <NavLink
              to="/addEvent"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              ADD EVENT
            </NavLink>
          </li>
          <li className="border-b border-gray-300 px-4 py-3">
            <NavLink
              to="/myEvent"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
              }
            >
              MY EVENT
            </NavLink>
          </li>

          {!loading && (
            user ? (
              <li className="px-4 py-3 border-t border-gray-300 flex items-center gap-3">
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  src={
                    user.photoUrl?.trim()
                      ? user.photoUrl
                      : "https://i.ibb.co/NtZn1yQ/default-user.png"
                  }
                  alt={user.username || "User"}
                  className="w-10 h-10 rounded-full border-2 border-black object-cover cursor-pointer"
                />
                <span>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="ml-auto text-blue-600 hover:text-blue-800"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="px-4 py-3 border-t border-gray-300">
                <button
                  onClick={() => {
                    handleOpen();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-black hover:text-blue-600"
                >
                  SIGN IN
                </button>
              </li>
            )
          )}
        </ul>
      )}

      {/* Desktop User Dropdown */}
      {!loading && user && (
        <div className="relative hidden md:block" ref={dropdownRef}>
          <img
            onClick={() => setDropdownOpen(!dropdownOpen)}
            src={
              user.photoUrl?.trim()
                ? user.photoUrl
                : "https://i.ibb.co/NtZn1yQ/default-user.png"
            }
            alt={user.username || "User"}
            className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold">{user.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop Sign In button */}
      {!loading && !user && (
        <h2
          onClick={handleOpen}
          className="hidden md:block text-white px-4 py-2 rounded hover:bg-white hover:text-indigo-700 transition cursor-pointer"
        >
          SIGN IN
        </h2>
      )}

      <Login open={open} handleClose={handleClose} setUser={setUser} />
    </nav>
  );
};

export default Navbar;
