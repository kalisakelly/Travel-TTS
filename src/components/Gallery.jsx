import React, { useState } from "react";
import "./Gallery.css";

const galleryData = [
  {
    id: 1,
    title: "Swiss Alps Viewpoint",
    location: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&fit=crop&w=1600&q=80",
    description:
      "Experience the panoramic beauty of the Swiss Alps, where every turn reveals a breathtaking view of nature’s splendor.",
  },
  {
    id: 2,
    title: "Maldives Beachfront",
    location: "Maldives",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    description:
      "Relax on pristine white beaches surrounded by crystal-clear waters and vibrant coral reefs in the Maldives.",
  },
  {
    id: 3,
    title: "Cherry Blossoms in Kyoto",
    location: "Japan",
    image:
      "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1600&q=80",
    description:
      "Stroll through Kyoto’s ancient temples as cherry blossoms paint the streets in hues of pink and white.",
  },
  {
    id: 4,
    title: "Santorini Sunset",
    location: "Greece",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    description:
      "Witness the world-famous sunset views from the cliffs of Santorini, overlooking the deep blue Aegean Sea.",
  },
  {
    id: 5,
    title: "Safari Adventure",
    location: "Kenya",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80",
    description:
      "Get close to Africa’s wildlife on a thrilling safari adventure across the Kenyan savannah.",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="gallery-container">
      <h2 className="gallery-heading">Explore Our Gallery</h2>

      <div className="gallery-grid">
        {galleryData.map((item) => (
          <div
            key={item.id}
            className="gallery-card"
            onClick={() => setSelectedImage(item)}
          >
            <div className="gallery-img-box">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p className="location">
                <i className="fa-solid fa-location-dot"></i> {item.location}
              </p>
              <button
                className="view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(item);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="modal-image"
            />
            <h2>{selectedImage.title}</h2>
            <p>{selectedImage.description}</p>
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
