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
    <div className="border rounded-md p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Posted By:</strong> {name}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Date & Time:</strong> {formattedDate}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Location:</strong> {location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Attendee Count:</strong> {attendeeCount}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onUpdate}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyCard;