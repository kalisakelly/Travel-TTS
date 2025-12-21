import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://msacco.local2:8003";
const API_URL = `${BASE_URL}/api/resource/Services?fields=["name","title","description","features"]`;

const Services = () => {
  const [services, setServices] = useState([]);

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


  return (
    <section className="section" style={styles.services}>
      <div className="container">
        <h2 className="section-title">Our Premium Services</h2>
        <p className="section-subtitle">
          From custom tour planning to premium vehicle rentals, we provide
          comprehensive travel solutions that make your journey extraordinary.
        </p>

        <div style={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.name} style={styles.serviceCard}>
              <h3 style={styles.serviceTitle}>{service.title}</h3>

              <p style={styles.serviceDescription}>
                {service.description}
              </p>

              {/* ✅ FIX HERE */}
              {service.features?.length > 0 && (
                <ul style={styles.featuresList}>
                  {service.features.map((item) => (
                    <li key={item.name} style={styles.featureItem}>
                      <span style={styles.bullet}>•</span>
                      {item.feature_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  services: { background: "#f8fafc" },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "50px",
  },
  serviceCard: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
  },
  serviceTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#1f2937",
  },
  serviceDescription: {
    color: "#6b7280",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  featuresList: { listStyle: "none", padding: 0 },
  featureItem: {
    padding: "5px 0",
    color: "#4b5563",
    display: "flex",
    alignItems: "center",
  },
  bullet: {
    color: "#2563eb",
    marginRight: "8px",
    fontWeight: "bold",
  },
};

export default Services;
