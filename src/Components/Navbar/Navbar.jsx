import { useEffect, useState, useRef } from "react";
import Login from "../LoginForm/Login";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false); // login modal
  const [user, setUser] = useState(null);  // user info
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown toggle
  const [loading, setLoading] = useState(true); // loading user state
  const dropdownRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch user on mount
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/user/me", {
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
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 left-0 w-full z-10">
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/yF3Vh1Xy/logo.png"
          alt="logo"
          className="w-80 h-30"
        />
      </div>

      <ul className="hidden md:flex gap-6 text-white font-semibold text-sm">
        <li><Link to={"/"}>HOME</Link></li>
        <li><Link to={"/events"}>EVENTS</Link></li>
        <li><Link to={"/addEvent"}>ADD EVENT</Link></li>
        <li><Link to={"/myEvent"}>MY EVENT</Link></li>
      </ul>

      {!loading && (
        user ? (
          <div className="relative" ref={dropdownRef}>
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
        ) : (
          <h2
            onClick={handleOpen}
            className="text-white px-4 py-2 rounded hover:bg-white hover:text-indigo-700 transition cursor-pointer"
          >
            SIGN IN
          </h2>
        )
      )}

      <Login open={open} handleClose={handleClose} setUser={setUser} />
    </nav>
  );
};

export default Navbar;
