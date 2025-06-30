import { useState, useContext } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthContex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    dateTime: "",
    location: "",
    description: "",
    attendeeCount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      toast.error("You must be logged in to add an event.");
      return;
    }

    try {
      const isoDate = new Date(formData.dateTime).toISOString();

      const finalData = {
        ...formData,
        dateTime: isoDate,
        email: user.email,
      };

      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Event added successfully!");
        setFormData({
          title: "",
          name: "",
          dateTime: "",
          location: "",
          description: "",
          attendeeCount: 0,
        });
      } else {
        toast.error(data.message || "Failed to add event.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 p-4">
      <div className="w-full max-w-md rounded-md shadow-md p-6 relative bg-white">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Add Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              required
            />
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              required
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none"
              required
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              required
            />
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <textarea
              name="description"
              placeholder="Event Description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
              required
            ></textarea>
            <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="number"
              name="attendeeCount"
              placeholder="Attendee Count (default 0)"
              value={formData.attendeeCount}
              onChange={handleChange}
              min="0"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold"
            style={{
              background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)",
            }}
          >
            Add Event
          </button>
        </form>
      </div>

      {/* Toast container included here */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddEvent;
