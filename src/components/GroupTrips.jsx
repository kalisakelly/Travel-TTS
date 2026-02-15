import { useState } from "react";
import { Heart, Calendar, Users, MapPin } from "lucide-react";
import { toast } from "sonner";
import "./GroupTrips.css";



const tripsData = [
  {
    id: 1,
    title: "Santorini Sunsets",
    location: "Greece",
    image: '',
    totalSpots: 20,
    takenSpots: 14,
    price: 2499,
    date: "Apr 12 – Apr 20, 2026",
    description:
      "Explore whitewashed villages, volcanic beaches, and legendary sunsets over the Aegean Sea.",
    active: true,
  },
  {
    id: 2,
    title: "Bali Rice Terraces",
    location: "Indonesia",
    image: '',
    totalSpots: 16,
    takenSpots: 9,
    price: 1899,
    date: "May 5 – May 14, 2026",
    description:
      "Trek lush rice paddies, visit sacred temples, and immerse yourself in Balinese culture.",
    active: true,
  },
  {
    id: 3,
    title: "Swiss Alpine Trail",
    location: "Switzerland",
    image: '',
    totalSpots: 12,
    takenSpots: 10,
    price: 3199,
    date: "Jun 18 – Jun 27, 2026",
    description:
      "Hike through wildflower meadows with panoramic views of snow-capped peaks and crystal lakes.",
    active: true,
  },
  {
    id: 4,
    title: "Machu Picchu Expedition",
    location: "Peru",
    image: '',
    totalSpots: 18,
    takenSpots: 5,
    price: 2799,
    date: "Jul 8 – Jul 18, 2026",
    description:
      "Follow the ancient Inca Trail to the lost city, exploring Andean culture along the way.",
    active: true,
  },
];

export default function GroupTrips() {
  const [savedTrips, setSavedTrips] = useState(new Set());
  const [bookingTripId, setBookingTripId] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const activeTrips = tripsData.filter((t) => t.active);

  const toggleSave = (id) => {
    setSavedTrips((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Trip removed from saved list");
      } else {
        next.add(id);
        toast.success("Trip saved!");
      }
      return next;
    });
  };

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value.trim());
  };

  const handleBook = () => {
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    toast.success(`Booking confirmed! Confirmation sent to ${email.trim()}`);
    setBookingTripId(null);
    setEmail("");
  };

  return (
    <section className="group-trips" id="group-trips">
      <div className="group-header">
        <p className="subtitle">Explore Together</p>
        <h2>Active Group Trips</h2>
        <p className="description">
          Join fellow travellers on curated adventures. Limited spots available —
          book yours today.
        </p>
      </div>

      <div className="trips-container">
        {activeTrips.map((trip) => {
          const available = trip.totalSpots - trip.takenSpots;
          const isSaved = savedTrips.has(trip.id);
          const isBooking = bookingTripId === trip.id;

          return (
            <article key={trip.id} className="trip-card">
              <div className="trip-image">
                <img src={trip.image} alt={trip.title} />
                <span className="spots-badge">
                  {available} spots left
                </span>
              </div>

              <div className="trip-content">
                <div className="trip-top">
                  <div>
                    <h3>{trip.title}</h3>
                    <p className="location">
                      <MapPin size={14} /> {trip.location}
                    </p>
                  </div>
                  <p className="price">
                    ${trip.price.toLocaleString()}
                  </p>
                </div>

                <p className="trip-description">
                  {trip.description}
                </p>

                <div className="trip-meta">
                  <span>
                    <Calendar size={16} /> {trip.date}
                  </span>
                  <span>
                    <Users size={16} /> {trip.takenSpots}/{trip.totalSpots} booked
                  </span>
                </div>

                {isBooking && (
                  <div className="booking-form">
                    <label>Enter your email to book</label>
                    <div className="booking-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        placeholder="you@example.com"
                      />
                      <button onClick={handleBook}>Confirm</button>
                    </div>
                    {emailError && (
                      <p className="error">{emailError}</p>
                    )}
                  </div>
                )}

                <div className="trip-actions">
                  <button
                    className="book-btn"
                    onClick={() =>
                      setBookingTripId(isBooking ? null : trip.id)
                    }
                  >
                    {isBooking ? "Cancel" : "Book a Place"}
                  </button>

                  <button
                    className={`save-btn ${isSaved ? "saved" : ""}`}
                    onClick={() => toggleSave(trip.id)}
                  >
                    <Heart
                      size={18}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
