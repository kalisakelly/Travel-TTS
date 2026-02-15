import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tours.css";

const BASE_URL = "http://msacco.local2:8003";
const API_URL = `${BASE_URL}/api/resource/Tours?fields=[
  "name",
  "title",
  "location",
  "price",
  "currency",
  "duration",
  "rating_rctn",
  "image",
  "pdf_doc"
]`;

 const normalizeImage = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image; // already full URL
  return `${BASE_URL}${image}`; // relative Frappe file
};

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data.data.map((tour) => ({
          ...tour,
          image: normalizeImage(tour.image),
        }));
        setTours(data);
      })
      .catch((err) => {
        console.error("Tours API error:", err);
      });
  }, []);

  const handleBook = (tour) => {
    alert(`Booking started for ${tour.title}`);
  };

  return (
    <div className="tours-container">
      <h2 className="tours-heading">Our Itineraries</h2>

      <div className="tours-scroll">
        {tours.map((tour) => (
          <div
            key={tour.name}
            className="tour-card"
            onClick={() => setSelectedTour(tour)}
          >
            <div className="tour-image">
              <img src={tour.image} alt={tour.title} />
              <span className="tour-days">{tour.duration} Days</span>
              <div className="tour-rating">
                ⭐ {tour.rating_rctn}
              </div>
            </div>

            <div className="tour-content">
              <h3>{tour.title}</h3>

              <p className="price">
                From {tour.currency} {Number(tour.price).toLocaleString()}
              </p>

              <p className="country">
                <i className="fa-solid fa-location-dot"></i> {tour.location}
              </p>

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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedTour.title}</h2>

            <img
              src={selectedTour.image}
              alt={selectedTour.title}
              className="modal-image"
            />

            {selectedTour.pdf_doc && (
              <a
                href={`${BASE_URL}${selectedTour.pdf_doc}`}
                target="_blank"
                rel="noreferrer"
                className="view-pdf-btn"
              >
                View Itinerary (PDF)
              </a>
            )}

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
