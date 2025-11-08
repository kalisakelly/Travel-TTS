import React from 'react'

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      title: "Swiss Alps Adventure",
      price: "From $1,299",
      location: "Switzerland",
      features: ["Mountain Hiking", "Scenic Railways", "Alpine Villages"]
    },
    {
      id: 2,
      title: "Tropical Paradise",
      price: "From $2,199",
      location: "Maldives",
      features: ["Water Sports", "Luxury Resorts", "Coral Reefs"]
    },
    {
      id: 3,
      title: "Cultural Heritage Tour",
      price: "From $1,799",
      location: "Japan",
      features: ["Ancient Temples", "Cherry Blossoms", "Traditional Culture"]
    }
  ]

  return (
    <section id="destinations" className="section">
      <div className="container">
        <h2 className="section-title">Featured Destinations</h2>
        <p className="section-subtitle">
          Discover breathtaking destinations around the world with our expertly crafted tour packages. 
          Each journey is designed to create unforgettable memories.
        </p>
        <div style={styles.destinationsGrid}>
          {destinations.map(destination => (
            <div key={destination.id} style={styles.destinationCard}>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{destination.title}</h3>
                <p style={styles.cardPrice}>{destination.price}</p>
                <p style={styles.cardLocation}>{destination.location}</p>
                <ul style={styles.featuresList}>
                  {destination.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>{feature}</li>
                  ))}
                </ul>
                <button className="btn" style={styles.bookButton}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  destinationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginTop: '50px',
  },
  destinationCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardContent: {
    padding: '30px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#1f2937',
  },
  cardPrice: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '5px',
  },
  cardLocation: {
    color: '#6b7280',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  featuresList: {
    listStyle: 'none',
    marginBottom: '25px',
  },
  featureItem: {
    padding: '8px 0',
    color: '#4b5563',
    borderBottom: '1px solid #f3f4f6',
  },
  bookButton: {
    width: '100%',
  }
}

export default Destinations