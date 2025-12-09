import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // Load gallery
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("LOAD ERROR:", err));
  }, []);

  // Live preview when image field changes
  useEffect(() => {
    setPreview(form.image);
  }, [form.image]);

  const addItem = () => {
    axios
      .post(API_URL, form)
      .then((res) => {
        setItems([...items, res.data]);
        resetForm();
      })
      .catch((err) => console.error("ADD ERROR:", err));
  };

  const updateItem = (id) => {
    axios
      .put(`${API_URL}/${id}`, form)
      .then((res) => {
        setItems(items.map((item) => (item.id === id ? res.data : item)));
        resetForm();
        setEditId(null);
      })
      .catch((err) => console.error("UPDATE ERROR:", err));
  };

  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("DELETE ERROR:", err));
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
  };

  const resetForm = () => {
    setForm({ title: "", location: "", image: "", description: "" });
    setPreview("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Gallery CRUD (Admin)</h2>

      {/* FORM INPUTS */}
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* LIVE PREVIEW */}
      {preview && (
        <div
          style={{
            marginTop: 15,
            marginBottom: 15,
            border: "1px solid #ddd",
            padding: 10,
            borderRadius: 8,
            width: 220,
          }}
        >
          <strong>Preview:</strong>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              height: "auto",
              marginTop: 10,
              borderRadius: 6,
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
            }}
          />
        </div>
      )}

      {/* BUTTONS */}
      {editId ? (
        <button onClick={() => updateItem(editId)}>Update</button>
      ) : (
        <button onClick={addItem}>Add</button>
      )}

      {editId && <button onClick={resetForm}>Cancel</button>}

      {/* LIST OF ITEMS */}
      <div style={{ marginTop: 20 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 12,
              borderRadius: 8,
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.location}</p>

            <img
              src={item.image}
              alt={item.title}
              style={{ width: 200, borderRadius: 6 }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=Invalid+URL")
              }
            />

            <p>{item.description}</p>

            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryCrud;
