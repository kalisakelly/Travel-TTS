import { useEffect, useState } from "react";
import axios from "axios";
import './ServicesCrud.css'; // Create this CSS file or use the same styles

const API_URL = "http://localhost:3001/services";

function ServicesCrud() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
    });
    const [editId, setEditId] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    // Load services - Fixed useEffect dependency array
    useEffect(() => {
        setLoading(true);
        axios
            .get(API_URL)
            .then((res) => setItems(res.data))
            .catch((err) => console.error("LOAD ERROR:", err))
            .finally(() => setLoading(false));
    }, []); // Added empty dependency array

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

    const deleteItem = (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        setLoading(true);
        axios
            .delete(`${API_URL}/${id}`)
            .then(() => {
                setItems(items.filter((item) => item.id !== id));
            })
            .catch((err) => console.error("DELETE ERROR:", err))
            .finally(() => setLoading(false));
    };
    
    const resetForm = () => {
        setForm({ title: "", description: "", image: "" });
        setEditId(null);
        setPreview("");
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setForm({
            title: item.title,
            description: item.description,
            image: item.image,
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
        <div className="services-crud">
            <header className="header">
                <h1>Services Management</h1>
                <p className="subtitle">Add, edit, or delete service offerings</p>
            </header>

            <main className="main-content">
                {/* FORM SECTION */}
                <section className="form-section">
                    <div className="form-card">
                        <h2>{editId ? "Edit Service" : "Add New Service"}</h2>
                        
                        <form onSubmit={handleSubmit} className="services-form">
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Title *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter service title"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Enter service description"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="form-textarea"
                                        rows="4"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Image URL *</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/service-image.jpg"
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        className="form-input"
                                        required
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
                                            ? "Update Service" 
                                            : "Add Service"
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

                {/* SERVICES LIST SECTION */}
                <section className="services-section">
                    <div className="section-header">
                        <h2>Services Offered ({items.length})</h2>
                        <div className="loading-indicator">
                            {loading && <span className="loading-dots">Loading...</span>}
                        </div>
                    </div>
                    
                    {items.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">✨</div>
                            <p>No services yet. Add your first service above!</p>
                        </div>
                    ) : (
                        <div className="services-grid">
                            {items.map((item) => (
                                <div key={item.id} className="service-card">
                                    <div className="service-image-container">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="service-image"
                                            onError={(e) =>
                                                (e.target.src =
                                                    "https://via.placeholder.com/400x300?text=Service+Image")
                                            }
                                        />
                                    </div>
                                    
                                    <div className="service-content">
                                        <h3 className="service-title">{item.title}</h3>
                                        
                                        {item.description && (
                                            <div className="service-description">
                                                <p>{item.description}</p>
                                            </div>
                                        )}
                                        
                                        <div className="service-actions">
                                            <button 
                                                onClick={() => startEdit(item)} 
                                                className="btn btn-edit"
                                            >
                                                Edit Service
                                            </button>
                                            <button 
                                                onClick={() => deleteItem(item.id)} 
                                                className="btn btn-delete"
                                            >
                                                Delete Service
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

export default ServicesCrud;