import React, { useState } from "react";
import "./Tours.css";

const toursData = [
  {
    id: 1,
    title: "Swiss Alps Adventure",
    country: "Switzerland",
    days: "7 Days",
    price: "$1,299",
    rating: 4.9,
    tags: ["Mountain Hiking", "Scenic Railways", "Alpine Villages"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    details:
      "Experience the majestic Swiss Alps with scenic train rides, mountain hikes, and picturesque alpine villages.",
  },
  {
    id: 2,
    title: "Tropical Paradise",
    country: "Maldives",
    days: "5 Days",
    price: "$2,199",
    rating: 4.8,
    tags: ["Water Sports", "Luxury Resorts", "Coral Reefs"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    details:
      "Relax on the white sandy beaches of the Maldives, dive into crystal-clear waters, and enjoy luxury seaside resorts.",
  },
  {
    id: 3,
    title: "Cultural Heritage Tour",
    country: "Japan",
    days: "10 Days",
    price: "$1,799",
    rating: 4.9,
    tags: ["Ancient Temples", "Cherry Blossoms", "Traditional Culture"],
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80",
    details:
      "Explore Japan’s historic temples, experience the beauty of cherry blossoms, and immerse yourself in traditional culture.",
  },
  {
    id: 4,
    title: "Cultural Heritage Tour",
    country: "Japan",
    days: "10 Days",
    price: "$1,799",
    rating: 4.9,
    tags: ["Ancient Temples", "Cherry Blossoms", "Traditional Culture"],
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80",
    details:
      "Explore Japan’s historic temples, experience the beauty of cherry blossoms, and immerse yourself in traditional culture.",
  },
  {
    id: 5,
    title: "Cultural Heritage Tour",
    country: "Japan",
    days: "10 Days",
    price: "$1,799",
    rating: 4.9,
    tags: ["Ancient Temples", "Cherry Blossoms", "Traditional Culture"],
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80",
    details:
      "Explore Japan’s historic temples, experience the beauty of cherry blossoms, and immerse yourself in traditional culture.",
  },
  {
    id: 6,
    title: "Cultural Heritage Tour",
    country: "Japan",
    days: "10 Days",
    price: "$1,799",
    rating: 4.9,
    tags: ["Ancient Temples", "Cherry Blossoms", "Traditional Culture"],
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80",
    details:
      "Explore Japan’s historic temples, experience the beauty of cherry blossoms, and immerse yourself in traditional culture.",
  },
];

const Tours = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [userRatings, setUserRatings] = useState({});

  const handleRate = (id, rating) => {
    setUserRatings({ ...userRatings, [id]: rating });
  };

  const handleBook = (tour) => {
    alert(`Booking started for ${tour.title}`);
  };

  return (
    <div className="tours-container">
      <h2 className="tours-heading"> Our Itineraries </h2>

      <div className="tours-scroll">
        {toursData.map((tour) => (
          <div
            key={tour.id}
            className="tour-card"
            onClick={() => setSelectedTour(tour)}
          >
            <div className="tour-image">
              <img src={tour.image} alt={tour.title} />
              <span className="tour-days">{tour.days}</span>
              <div className="tour-rating">
                ⭐ {userRatings[tour.id] || tour.rating}
              </div>
            </div>

            <div className="tour-content">
              <h3>{tour.title}</h3>
              <p className="price">From {tour.price}</p>
              <p className="country">
                <i className="fa-solid fa-location-dot"></i> {tour.country}
              </p>

              <div className="tags">
                {tour.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <button
                className="book-trip-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBook(tour);
                }}
              >
                <i className="fa-solid fa-calendar-days"></i> Book This Trip
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTour && (
        <div className="modal-overlay" onClick={() => setSelectedTour(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedTour.title}</h2>
            <img
              src={selectedTour.image}
              alt={selectedTour.title}
              className="modal-image"
            />
            <p>{selectedTour.details}</p>

            <div className="rating-section">
              <p>Rate this trip:</p>
              {[1, 2, 3, 4, 5].map((r) => (
                <span
                  key={r}
                  className={`star ${
                    userRatings[selectedTour.id] >= r ? "active" : ""
                  }`}
                  onClick={() => handleRate(selectedTour.id, r)}
                >
                  ⭐
                </span>
              ))}
            </div>

            <button
              className="modal-book-btn"
              onClick={() => handleBook(selectedTour)}
            >
              Book Now
            </button>
            <button
              className="modal-close"
              onClick={() => setSelectedTour(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
