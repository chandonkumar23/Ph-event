import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../Auth/AuthContex';
import MyCard from './MyCard';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const MyEvent = () => {
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const BookingsData = `https://event-server-nu-lyart.vercel.app/api/events/${user.email}`;

    fetch(BookingsData)
      .then(res => res.json())
      .then(data => setBooking(data))
      .catch(err => console.error("Failed to fetch bookings", err));
  }, [user?.email]);

  const confirmDelete = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    fetch(`https://event-server-nu-lyart.vercel.app/api/events/${bookToDelete._id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setBooking(prev => prev.filter(item => item._id !== bookToDelete._id));
        setShowDeleteModal(false);
        setBookToDelete(null);
        toast.success("Event deleted successfully!"); 
      })
      .catch(err => {
        console.error("Delete failed", err);
        toast.error("Delete failed!");
      });
  };

  const handleUpdateSubmit = () => {
    const updatePayload = { ...selectedBook };
    const eventId = updatePayload._id;
    delete updatePayload._id;

    fetch(`https://event-server-nu-lyart.vercel.app/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload),
    })
      .then(res => res.json())
      .then(() => {
        fetch(`https://event-server-nu-lyart.vercel.app/api/events/${user.email}`)
          .then(res => res.json())
          .then(data => {
            setBooking(data);
            setSelectedBook(null);
            toast.success("Event updated successfully!"); 
          });
      })
      .catch(error => {
        console.error("Update failed:", error);
        toast.error("Update failed!");
      });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "attendeeCount" ? Number(value) : value;
    setSelectedBook(prev => ({ ...prev, [name]: newValue }));
  };

  if (!user?.email) {
    return <div className="p-7 text-lg text-gray-600">Loading user data...</div>;
  }

  return (
    <div className="p-7 pt-36 min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 text-white overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center">My Events</h2>

      {booking.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="p-7 bg-slate-50 rounded-lg">
          {booking?.map(book => (
            <MyCard
              key={book._id}
              book={book}
              onDelete={() => confirmDelete(book)}
              onUpdate={() => setSelectedBook(book)}
            />
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Event</h3>
            <div className="space-y-4">
              {/* All inputs... */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedBook.title}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedBook.name}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={new Date(selectedBook.dateTime).toISOString().slice(0, 16)}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedBook.location}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={selectedBook.description}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter event description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attendee Count</label>
                <input
                  type="number"
                  name="attendeeCount"
                  value={selectedBook.attendeeCount}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border rounded"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleUpdateSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setSelectedBook(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[350px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete the event: <strong>{bookToDelete?.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default MyEvent;
