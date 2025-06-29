// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect after alert
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Access Denied</h2>
        <p className="mb-4">You must be logged in to view this page.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
