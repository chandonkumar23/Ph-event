import { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    photoUrl: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const normalizedEmail = form.email.toLowerCase();

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: normalizedEmail,
          photoUrl: form.photoUrl,
          password: form.password
        })
      });

      const data = await res.json();
      if (res.ok) {
        const loginRes = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: normalizedEmail,
            password: form.password,
          }),
        });

        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem('token', loginData.token);
          setUser(loginData.user);
          toast.success("Signup & login successful!");

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error("Signup done, but login failed: " + (loginData.message || ""));
        }
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["username", "email", "photoUrl", "password", "confirmPassword"].map((name, idx) => (
            <div className="relative" key={name}>
              <input
                type={name.includes("password") ? "password" : "text"}
                placeholder={
                  name === "photoUrl"
                    ? "Photo URL"
                    : name.charAt(0).toUpperCase() + name.slice(1)
                }
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              {idx === 0 && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              {idx === 1 && <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              {idx === 2 && <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              {idx > 2 && <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold"
            style={{ background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)" }}
          >
            Sign Up
          </button>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
