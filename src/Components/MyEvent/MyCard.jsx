import React from "react";

const MyCard = ({ book, onDelete, onUpdate }) => {
  const {
    _id,
    title,
    name,
    dateTime,
    location,
    description,
    attendeeCount,
  } = book;

  const formattedDate = new Date(dateTime).toLocaleString();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.01] border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

  <div className="text-gray-600 space-y-1 mb-4">
    <p>
      <span className="font-medium text-gray-700">👤 Posted By:</span> {name}
    </p>
    <p>
      <span className="font-medium text-gray-700">🕒 Date & Time:</span> {formattedDate}
    </p>
    <p>
      <span className="font-medium text-gray-700">📍 Location:</span> {location}
    </p>
    <p>
      <span className="font-medium text-gray-700">📝 Description:</span> {description}
    </p>
    <p>
      <span className="font-medium text-gray-700">👥 Attendees:</span> {attendeeCount}
    </p>
  </div>

  <div className="flex justify-end gap-3">
    <button
      onClick={onUpdate}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
    >
      ✏️ Update
    </button>
    <button
      onClick={onDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
    >
      🗑️ Delete
    </button>
  </div>
</div>

  );
};

export default MyCard;