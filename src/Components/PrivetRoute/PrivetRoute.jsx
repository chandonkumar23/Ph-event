import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(3); // seconds left
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAlert(true);
      // Countdown interval every 1 second
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setRedirect(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (redirect) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  if (showAlert) {
    return (
      <div className="fixed inset-0 from-purple-700 via-indigo-700 to-blue-500 flex items-center justify-center z-50">
        <div className="from-purple-700 via-indigo-700 to-blue-500 p-8 rounded-md shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Access Denied</h2>
          <p className="mb-4">You must be logged in to view this page.</p>
          <p>Redirecting to signup in {countdown} second{countdown !== 1 ? "s" : ""}...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
