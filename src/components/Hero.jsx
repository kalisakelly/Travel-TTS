import React from "react";
import "./Hero.css"; // <-- import the CSS file
import logo from "../public/logo.png"; // <-- import logo image

const Hero = () => {
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

        <button className="book-btn">Book Now</button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>
            Discover Your Next Adventure with <br />
            <span> ROADTRIP TOURS & TRAVEL Ltd</span>
          </h1>

          <p>
            Your Journey, Our Passion.

            At Roadtrip Tours & Travel Ltd, we believe every journey tells a story — yours.
            We specialize in creating unforgettable travel experiences across Rwanda, East Africa, and beyond, blending nature, culture, and adventure into memories that last a lifetime.

            Whether you dream of a thrilling wildlife safari, a serene lakeside escape, or an immersive cultural encounter, our expert team is here to plan it all — your way.

          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              <i className="fa-solid fa-calendar-days"></i> Book Your Trip
            </button>
            <button className="secondary-btn">
              <i className="fa-solid fa-map-location-dot"></i> Explore Destinations
            </button>
          </div>

          {/* <div className="hero-stats">
            <div>
              <p className="number">500+</p>
              <p>Happy Travelers</p>
            </div>
            <div>
              <p className="number">50+</p>
              <p>Destinations</p>
            </div>
            <div>
              <p className="number">24/7</p>
              <p>Customer Support</p>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
