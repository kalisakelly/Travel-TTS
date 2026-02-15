import React, { useEffect, useState } from "react";
import "./Hero.css";

const images = [
  "https://images.unsplash.com/photo-1508264165352-258859e62245?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=2000&q=80",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="navbar-icon">
            <i className="fa-solid fa-location-dot"></i>
          </div>
        </div>

        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#blogs">Blogs</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#destinations">Destinations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Slideshow Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Discover Your Next Adventure with <br />
            <span>ROADTRIP TOURS & TRAVEL Ltd</span>
          </h1>

          <p>
            Your Journey, Our Passion. We create unforgettable travel experiences
            across Rwanda, East Africa, and beyond — blending nature, culture,
            and adventure into lifelong memories.
          </p>

          <div className="hero-buttons">
            <a href="#group-trips">
              <button className="primary-btn">
                <i className="fa-solid fa-calendar-days"></i> Book Your Trip
              </button>
            </a>

            <button className="secondary-btn">
              <i className="fa-solid fa-map-location-dot"></i> Explore Destinations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
