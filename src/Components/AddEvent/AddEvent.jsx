import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaClipboardList, FaUsers } from "react-icons/fa";

const AddEvent = () => {
  const [attendeeCount, setAttendeeCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 p-4">
      <div className="w-full max-w-md  rounded-md shadow-md p-6 relative">
        {/* Title */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold text-white">Add Event</h2>
        
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Event Title */}
          <div className="relative">
            <input
              type="text"
              placeholder="Event Title"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Date & Time */}
          <div className="relative">
            <input
              type="datetime-local"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Location */}
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              placeholder="Event Description"
              rows="3"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
            ></textarea>
            <FaClipboardList className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Attendee Count */}
          <div className="relative">
            <input
              type="number"
              placeholder="Attendee Count (default 0)"
              value={attendeeCount}
              onChange={(e) => setAttendeeCount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
              min="0"
            />
            <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Submit Button */}
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
    </div>
  );
};

export default AddEvent;
