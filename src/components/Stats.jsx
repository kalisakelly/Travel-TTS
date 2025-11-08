import React from 'react'

const Stats = () => {
  const stats = [
    { number: "500+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "24/7", label: "Customer Support" }
  ]

  return (
    <section className="section">
      <div className="container">
        <div style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '40px',
    padding: '40px 0',
    borderTop: '1px solid #e5e7eb',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '1.1rem',
    color: '#6b7280',
    fontWeight: '500',
  }
}

export default Stats