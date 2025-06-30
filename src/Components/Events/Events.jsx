import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(isBetween);
dayjs.extend(isoWeek);

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateRangeFilter, setDateRangeFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [joinedEvents, setJoinedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/events");
                const data = await res.json();
                setEvents(data);
                setFilteredEvents(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setLoading(false);
            }
        };

        const storedJoined = JSON.parse(localStorage.getItem("joinedEvents") || "[]");
        setJoinedEvents(storedJoined);

        fetchEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [searchTerm, selectedDate, dateRangeFilter, events]);

    const formatDate = (dt) => dayjs(dt).format("YYYY-MM-DD");

    const filterEvents = () => {
        let result = [...events];

        if (searchTerm.trim()) {
            result = result.filter((event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedDate) {
            const selected = formatDate(selectedDate);
            result = result.filter((event) => {
                const eventDate = formatDate(event.dateTime);
                return eventDate === selected;
            });
        } else {
            const now = dayjs();
            switch (dateRangeFilter) {
                case "thisWeek":
                    result = result.filter((event) => {
                        const date = formatDate(event.dateTime);
                        return date >= now.startOf("isoWeek").format("YYYY-MM-DD") &&
                            date <= now.endOf("isoWeek").format("YYYY-MM-DD");
                    });
                    break;
                case "lastWeek":
                    result = result.filter((event) => {
                        const date = formatDate(event.dateTime);
                        return date >= now.subtract(1, "week").startOf("isoWeek").format("YYYY-MM-DD") &&
                            date <= now.subtract(1, "week").endOf("isoWeek").format("YYYY-MM-DD");
                    });
                    break;
                case "thisMonth":
                    result = result.filter((event) =>
                        dayjs(event.dateTime).format("YYYY-MM") === now.format("YYYY-MM")
                    );
                    break;
                case "lastMonth":
                    result = result.filter((event) =>
                        dayjs(event.dateTime).format("YYYY-MM") === now.subtract(1, "month").format("YYYY-MM")
                    );
                    break;
                default:
                    break;
            }
        }

        setFilteredEvents(result);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedDate(null);
        setDateRangeFilter("all");
        setFilteredEvents(events);
    };

    const handleJoin = async (eventId) => {
        if (joinedEvents.includes(eventId)) {
            alert("You already joined this event.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/events/join/${eventId}`, {
                method: "PATCH",
            });

            const data = await res.json();
            if (res.ok) {
                // Update local list
                const updatedEvents = events.map((ev) =>
                    ev._id === eventId ? { ...ev, attendeeCount: ev.attendeeCount + 1 } : ev
                );
                setEvents(updatedEvents);

                // Track joined
                const updatedJoined = [...joinedEvents, eventId];
                setJoinedEvents(updatedJoined);
                localStorage.setItem("joinedEvents", JSON.stringify(updatedJoined));
            } else {
                alert(data.message || "Failed to join event.");
            }
        } catch (err) {
            console.error("Join error:", err);
            alert("Something went wrong.");
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-red">Loading events...</div>;
    }

    return (
        <div className="min-h-screen pt-32 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">All Events</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center items-center mb-10">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="px-4 py-2 rounded-md w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        setDateRangeFilter("all");
                    }}
                    placeholderText="Select a date"
                    className="px-4 py-2 rounded-md w-44"
                    dateFormat="yyyy-MM-dd"
                />

                <select
                    className="px-4 py-2 rounded-md w-52"
                    value={dateRangeFilter}
                    onChange={(e) => {
                        setDateRangeFilter(e.target.value);
                        setSelectedDate(null);
                    }}
                >
                    <option value="all">Select a date range</option>
                    <option value="thisWeek">This Week</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                </select>

                <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-md bg-white text-black border hover:bg-gray-100"
                >
                    Clear Filters ✖
                </button>
            </div>

            {/* Cards */}
            {filteredEvents.length === 0 ? (
                <div className="text-center text-white">No events found.</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white p-4 rounded-lg shadow-md border"
                        >
                            <h3 className="text-lg font-semibold text-purple-700 mb-2">
                                {event.title}
                            </h3>
                            <p className="text-sm text-gray-600">By: {event.name}</p>
                            <p className="text-sm text-gray-600">📍 {event.location}</p>
                            <p className="text-sm text-gray-600">
                                🗓️ {new Date(event.dateTime).toLocaleString()}
                            </p>
                            <p className="text-gray-700 mt-2">{event.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                👥 Attendees: {event.attendeeCount}
                            </p>
                            <button
                                onClick={() => handleJoin(event._id)}
                                disabled={joinedEvents.includes(event._id)}
                                style={
                                    joinedEvents.includes(event._id)
                                        ? {}
                                        : {
                                            background: "linear-gradient(to right, #833ab4, #5851db, #1e90ff)",
                                        }
                                }
                                className={`mt-3 px-4 py-2 rounded-md w-full text-white font-semibold ${joinedEvents.includes(event._id)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : ""
                                    }`}
                            >
                                {joinedEvents.includes(event._id) ? "Joined" : "Join Event"}
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
