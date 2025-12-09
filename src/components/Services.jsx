import React from 'react'

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Custom Tour Planning",
      description: "Personalized itineraries crafted by our expert travel consultants to match your preferences and budget.",
      features: ["Expert Guides", "Flexible Schedules", "Local Experiences"]
    },
    {
      id: 2,
      title: "Premium Car Rentals",
      description: "Wide selection of well-maintained vehicles from economy to luxury, perfect for any journey.",
      features: ["Latest Models", "Full Insurance", "GPS Navigation"]
    },
    {
      id: 3,
      title: "Destination Expertise",
      description: "Deep local knowledge and insider access to hidden gems and must-see attractions.",
      features: ["Local Insights", "Hidden Gems", "Cultural Experiences"]
    },
    
  ]

  return (
    <section className="section" style={styles.services}>
      <div className="container">
        <h2 className="section-title">Our Premium Services</h2>
        <p className="section-subtitle">
          From custom tour planning to premium vehicle rentals, we provide comprehensive travel 
          solutions that make your journey extraordinary.
        </p>
        <div style={styles.servicesGrid}>
          {services.map(service => (
            <div key={service.id} style={styles.serviceCard}>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>{service.description}</p>
              <ul style={styles.featuresList}>
                {service.features.map((feature, index) => (
                  <li key={index} style={styles.featureItem}>
                    <span style={styles.bullet}>•</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  services: {
    background: '#f8fafc',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '50px',
  },
  serviceCard: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  serviceTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#1f2937',
  },
  serviceDescription: {
    color: '#6b7280',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  featuresList: {
    listStyle: 'none',
  },
  featureItem: {
    padding: '5px 0',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
  },
  bullet: {
    color: '#2563eb',
    marginRight: '8px',
    fontWeight: 'bold',
  }
}

export default Services