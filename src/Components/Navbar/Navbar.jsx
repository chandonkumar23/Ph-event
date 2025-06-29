import { useState } from "react";
import Login from "../LoginForm/Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 left-0 w-full z-10 ">
      <div className="flex items-center gap-2">
        <img src="https://i.ibb.co/yF3Vh1Xy/logo.png" alt="logo" className="w-80 h-30" />
        <div>
        </div>
      </div>
      <ul className="hidden md:flex gap-6 text-white font-semibold text-sm">
        <li><Link to={"/"}>HOME</Link></li>
       <li><Link to={"/events"}>EVENTS</Link></li> 
       <li><Link to={"/addEvent"}>ADD EVENT</Link></li> 
       <li><Link to={"/myEvent"}>MY EVENT</Link></li> 
      </ul>
      <h2 onClick={handleOpen} className=" text-white px-4 py-2 rounded hover:bg-white hover:text-indigo-700 transition">
        SIGN IN
      </h2>
      <Login open={open} handleClose={handleClose} />
    </nav>
  );
};

export default Navbar;
