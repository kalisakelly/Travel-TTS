import { useState } from "react";
import './ContactUs.css';
import axios from "axios";

const API_URL = "http://localhost:3001/contact"; // Your backend endpoint

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!form.message.trim()) {
      setError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(API_URL, form);
      
      if (response.data.success) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        err.response?.data?.message || 
        "Unable to send message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      info: "admin@travelwebsite.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: "📞",
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm"
    },
    {
      icon: "📍",
      title: "Visit Us",
      info: "123 Travel Street",
      description: "Adventure City, AC 12345"
    }
  ];

  return (
    <section id="contact">
        <div className="contact-us">
        {/* Header Section */}
        <header className="contact-header">
            <div className="container">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
                Have questions about our tours or services? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
            </p>
            </div>
        </header>

        <main className="contact-main">
            <div className="container">
            <div className="contact-grid">
                {/* Contact Form */}
                <div className="contact-form-section">
                <div className="form-card">
                    <h2 className="form-title">Send us a Message</h2>
                    
                    {/* Success Message */}
                    {success && (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <div className="success-content">
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for contacting us. We'll get back to you soon.</p>
                        </div>
                    </div>
                    )}

                    {/* Error Message */}
                    {error && (
                    <div className="error-message">
                        <div className="error-icon">⚠️</div>
                        <div className="error-content">
                        <p>{error}</p>
                        </div>
                    </div>
                    )}

                    <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                        <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your full name"
                            disabled={loading}
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your email address"
                            disabled={loading}
                        />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                        Subject (Optional)
                        </label>
                        <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="What is this regarding?"
                        disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message" className="form-label">
                        Your Message *
                        </label>
                        <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Tell us about your inquiry..."
                        rows="6"
                        disabled={loading}
                        />
                        <div className="char-count">
                        {form.message.length} / 1000 characters
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                        <>
                            <span className="spinner"></span>
                            Sending Message...
                        </>
                        ) : (
                        "Send Message"
                        )}
                    </button>
                    </form>
                </div>
                </div>

                {/* Contact Information */}
                <div className="contact-info-section">
                <div className="info-card">
                    <h2 className="info-title">Contact Information</h2>
                    <p className="info-description">
                    Fill out the form or reach out through any of these channels
                    </p>
                    
                    <div className="info-list">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="info-item">
                        <div className="info-icon">{item.icon}</div>
                        <div className="info-content">
                            <h3 className="info-item-title">{item.title}</h3>
                            <p className="info-item-text">{item.info}</p>
                            <p className="info-item-description">{item.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="office-hours">
                    <h3 className="hours-title">Office Hours</h3>
                    <div className="hours-grid">
                        <div className="hours-day">Monday - Friday</div>
                        <div className="hours-time">9:00 AM - 6:00 PM</div>
                        <div className="hours-day">Saturday</div>
                        <div className="hours-time">10:00 AM - 4:00 PM</div>
                        <div className="hours-day">Sunday</div>
                        <div className="hours-time">Closed</div>
                    </div>
                    </div>

                    <div className="social-links">
                    <h3 className="social-title">Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon" aria-label="Facebook">
                        📘
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                        📷
                        </a>
                        <a href="#" className="social-icon" aria-label="Twitter">
                        🐦
                        </a>
                        <a href="#" className="social-icon" aria-label="LinkedIn">
                        💼
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </main>

        {/* FAQ Section */}
        <section className="faq-section">
            <div className="container">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
                <div className="faq-item">
                <h3 className="faq-question">How quickly will I receive a response?</h3>
                <p className="faq-answer">
                    We typically respond to all inquiries within 24 hours during business days.
                </p>
                </div>
                <div className="faq-item">
                <h3 className="faq-question">Can I book a tour through the contact form?</h3>
                <p className="faq-answer">
                    While you can inquire about tours, booking is done through our booking system. We'll guide you through the process.
                </p>
                </div>
                <div className="faq-item">
                <h3 className="faq-question">Do you offer group discounts?</h3>
                <p className="faq-answer">
                    Yes! We offer special rates for groups of 6 or more. Contact us for custom quotes.
                </p>
                </div>
                <div className="faq-item">
                <h3 className="faq-question">What information should I include in my message?</h3>
                <p className="faq-answer">
                    Please include your name, preferred travel dates, number of travelers, and any specific requirements.
                </p>
                </div>
            </div>
            </div>
        </section>
        </div>
    </section>
  );
}

export default ContactUs;