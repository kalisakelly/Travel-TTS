import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./Gallery.css";

const BASE_URL = "http://msacco.local2:8003";
const API_URL =
  `${BASE_URL}/api/resource/Gallery?fields=["name","title","image","description"]`;

const ITEMS_PER_PAGE = 6;

const normalizeImage = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${BASE_URL}${image}`;
};

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        const data = res.data.data.map((item) => ({
          ...item,
          image: normalizeImage(item.image),
        }));
        setGalleryData(data);
      })
      .catch((err) => {
        console.error("Gallery API error:", err);
      });
  }, []);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = galleryData.map((item) => item.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [galleryData]);

  // Filter + search
  const filteredData = useMemo(() => {
    return galleryData.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [galleryData, activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">

        <h2 className="gallery-heading">Explore Our Gallery</h2>

        {/* 🔎 Search */}
        <input
          type="text"
          placeholder="Search gallery..."
          className="gallery-search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* 🏷 Category Filters */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🖼 Grid */}
        <div className="gallery-grid">
          {paginatedData.map((item) => (
            <div
              key={item.name}
              className="gallery-card"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-img-box">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="gallery-info">
                <h3>{item.title}</h3>
                <span className="gallery-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 📄 Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* 🪟 Modal */}
        {selectedImage && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.image} alt={selectedImage.title} />
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
              <button
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
