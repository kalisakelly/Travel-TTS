import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const API_URL = "http://localhost:3001/gallery";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setGalleryData(res.data);
    });
  }, []);

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
