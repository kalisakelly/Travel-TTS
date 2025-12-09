import React, { useEffect, useState } from "react";
import axios from "axios";
import './GalleryCrud.css'; // Create this CSS file or use inline styles as shown

const API_URL = "http://localhost:3001/gallery";

function GalleryCrud() {
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

  // Load gallery
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

  const addItem = () => {
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

  const updateItem = (id) => {
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

  const deleteItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
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

  const resetForm = () => {
    setForm({ title: "", location: "", image: "", description: "" });
    setPreview("");
    setEditId(null);
  };

  return (
    <div className="gallery-crud">
      <header className="header">
        <h1>Gallery Management</h1>
        <p className="subtitle">Add, edit, or delete gallery items</p>
      </header>

      <main className="main-content">
        {/* FORM SECTION */}
        <section className="form-section">
          <div className="form-card">
            <h2>{editId ? "Edit Item" : "Add New Item"}</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="Enter item title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  placeholder="Enter description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>

            {/* LIVE PREVIEW */}
            {preview && (
              <div className="preview-section">
                <h3>Image Preview</h3>
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
                </div>
              </div>
            )}

            {/* FORM BUTTONS */}
            <div className="form-actions">
              {editId ? (
                <>
                  <button 
                    onClick={() => updateItem(editId)} 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Item"}
                  </button>
                  <button 
                    onClick={resetForm} 
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={addItem} 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Item"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="gallery-section">
          <h2>Gallery Items ({items.length})</h2>
          
          {loading && !items.length ? (
            <div className="loading">Loading gallery items...</div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>No gallery items yet. Add your first item above!</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {items.map((item) => (
                <div key={item.id} className="gallery-card">
                  <div className="card-header">
                    <h3 className="card-title">{item.title}</h3>
                    {item.location && (
                      <div className="card-location">
                        📍 {item.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="card-image"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/400x300?text=Image+Not+Found")
                      }
                    />
                  </div>
                  
                  {item.description && (
                    <div className="card-description">
                      <p>{item.description}</p>
                    </div>
                  )}
                  
                  <div className="card-actions">
                    <button 
                      onClick={() => startEdit(item)} 
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteItem(item.id)} 
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
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

export default GalleryCrud;