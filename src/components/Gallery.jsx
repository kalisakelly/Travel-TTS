import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";

const BASE_URL = "http://msacco.local2:8003";
const API_URL =
  `${BASE_URL}/api/resource/Gallery?fields=["name","title","image","description"]`;

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        // ✅ Frappe data is inside res.data.data
        const data = res.data.data.map((item) => ({
          ...item,
          image: item.image ? `${BASE_URL}${item.image}` : "",
        }));
        setGalleryData(data);
      })
      .catch((err) => {
        console.error("Gallery API error:", err);
      });
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <h2 className="gallery-heading">Explore Our Gallery</h2>

        <div className="gallery-grid">
          {galleryData.map((item) => (
            <div
              key={item.name} // ✅ use name, not id
              className="gallery-card"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-img-box">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="gallery-info">
                <h3>{item.title}</h3>

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
    </section>
  );
};

export default Gallery;
