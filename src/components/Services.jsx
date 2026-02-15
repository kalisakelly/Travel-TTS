import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Services.css";

const BASE_URL = "http://msacco.local2:8003";

const Services = () => {
  const [services, setServices] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/resource/Services`).then((res) => {
      const names = res.data.data;

      Promise.all(
        names.map((row) =>
          axios.get(`${BASE_URL}/api/resource/Services/${row.name}`)
        )
      ).then((responses) => {
        const services = responses.map((r) => r.data.data);
        setServices(services);
      });
    });
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Our Premium Services</h2>
        <p>
          From custom tour planning to premium vehicle rentals, we provide
          comprehensive travel solutions that make your journey extraordinary.
        </p>
      </div>

      <div className="slider-wrapper">
        <button className="slider-btn left" onClick={scrollLeft}>
          ❮
        </button>

        <div className="services-slider" ref={sliderRef}>
          {services.map((service) => (
            <div key={service.name} className="service-card">
              <h3>{service.title}</h3>

              <p className="description">{service.description}</p>

              {service.features?.length > 0 && (
                <ul>
                  {service.features.map((item) => (
                    <li key={item.name}>{item.feature_name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default Services;
