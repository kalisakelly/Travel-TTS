import { useEffect, useState } from "react";
import axios from "axios";
import './ToursCrud.css'; // Create this CSS file

const API_URL = "http://localhost:3001/tours";

function ToursCrud() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Load tours
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("LOAD ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  // Live preview when image field changes
  useEffect(() => {
    setPreview(form.image);
  }, [form.image]);

  const addItem = (e) => {
    e?.preventDefault();
    if (!form.title || !form.image) {
      alert("Title and Image URL are required");
      return;
    }
    
    setLoading(true);
    axios
      .post(API_URL, form)
      .then((res) => {
        setItems([...items, res.data]);
        resetForm();
      })
      .catch((err) => console.error("ADD ERROR:", err))
      .finally(() => setLoading(false));
  };

  const updateItem = (id, e) => {
    e?.preventDefault();
    setLoading(true);
    axios
      .put(`${API_URL}/${id}`, form)
      .then((res) => {
        setItems(items.map((item) => (item.id === id ? res.data : item)));
        resetForm();
        setEditId(null);
      })
      .catch((err) => console.error("UPDATE ERROR:", err))
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setForm({ title: "", location: "", image: "", description: "" });
    setPreview("");
    setEditId(null);
  };

  const deleteItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    setLoading(true);
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("DELETE ERROR:", err))
      .finally(() => setLoading(false));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      location: item.location,
      image: item.image,
      description: item.description,
    });
    setPreview(item.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateItem(editId, e);
    } else {
      addItem(e);
    }
  };

  return (
    <div className="tours-crud">
      <header className="header">
        <h1>Tours Management</h1>
        <p className="subtitle">Add, edit, or delete travel tours</p>
      </header>

      <main className="main-content">
        {/* FORM SECTION */}
        <section className="form-section">
          <div className="form-card">
            <h2>{editId ? "Edit Tour" : "Add New Tour"}</h2>
            
            <form onSubmit={handleSubmit} className="tours-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="Enter tour title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Enter tour location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Image URL *</label>
                  <input
                    type="text"
                    placeholder="https://example.com/tour-image.jpg"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter tour description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </div>

              {/* LIVE PREVIEW */}
              {preview && (
                <div className="preview-section">
                  <h3>Tour Image Preview</h3>
                  <div className="preview-container">
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                      }}
                    />
                    <div className="preview-info">
                      <p className="preview-title">{form.title || "Tour Title"}</p>
                      {form.location && <p className="preview-location">📍 {form.location}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* FORM BUTTONS */}
              <div className="form-actions">
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading 
                    ? editId 
                      ? "Updating..." 
                      : "Adding..."
                    : editId 
                      ? "Update Tour" 
                      : "Add Tour"
                  }
                </button>
                
                {editId && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* TOURS SECTION */}
        <section className="tours-section">
          <div className="section-header">
            <h2>Available Tours ({items.length})</h2>
            <div className="loading-indicator">
              {loading && <span className="loading-dots">Loading tours...</span>}
            </div>
          </div>
          
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏔️</div>
              <p>No tours available yet. Add your first tour above!</p>
            </div>
          ) : (
            <div className="tours-grid">
              {items.map((item) => (
                <div key={item.id} className="tour-card">
                  <div className="tour-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="tour-image"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x300?text=Tour+Image")
                      }
                    />
                    <div className="tour-badge">Tour</div>
                  </div>
                  
                  <div className="tour-content">
                    <div className="tour-header">
                      <h3 className="tour-title">{item.title}</h3>
                      {item.location && (
                        <div className="tour-location">
                          <span className="location-icon">📍</span>
                          {item.location}
                        </div>
                      )}
                    </div>
                    
                    {item.description && (
                      <div className="tour-description">
                        <p>{item.description}</p>
                      </div>
                    )}
                    
                    <div className="tour-actions">
                      <button 
                        onClick={() => startEdit(item)} 
                        className="btn btn-edit"
                      >
                        Edit Tour
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id)} 
                        className="btn btn-delete"
                      >
                        Delete Tour
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ToursCrud;