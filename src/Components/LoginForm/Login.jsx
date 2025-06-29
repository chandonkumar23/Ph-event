import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ handleClose, open, setUser }) => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSignupClick = () => {
    handleClose();
    navigate('/signup');
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem('token', data.token);
        setUser(data.user); // set user in Navbar
        handleClose();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className={`bg-white text-white rounded-lg shadow-lg p-6 w-full max-w-[700px] transform transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div>
          <div className='flex justify-between items-center border-b-2 p-2 mb-10'>
            <h2 className='text-black'>Login</h2>
            <CloseIcon onClick={handleClose} className='text-black' />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="bg-transparent w-full outline-none text-gray-700"
              />
              <FaUser className="text-gray-400" />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent w-full outline-none text-gray-700"
              />
              <button onClick={() => setShowPassword(!showPassword)} type="button">
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-br hover:opacity-90"
              style={{ background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)" }}
            >
              Log In
            </button>
            <h2 className='text-black'>
              Don't have an account?{' '}
              <button onClick={handleSignupClick} className="text-blue-600 underline">
                Sign up
              </button>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
