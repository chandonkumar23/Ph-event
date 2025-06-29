
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6 relative">
        {/* Title and Close */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Sign Up</h2>

        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold"
            style={{
              background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)",
            }}
          >
            Sign Up
          </button>

          {/* Footer Links */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            {/* <div className="text-right">
              <a href="#" className="hover:underline">Already have an account?</a><br />
              <a href="#" className="hover:underline">Login Here</a>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
