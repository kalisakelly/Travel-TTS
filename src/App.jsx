import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Tours from "./components/Tours";

// Public gallery (viewer only)
import Gallery from "./components/Gallery";

// Admin gallery (CRUD)
import GalleryCrud from "./components/GalleryCrud";

function App() {
  return (
    <Router>
      <Routes>

        {/* ------- PUBLIC HOME PAGE ------- */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Destinations />
              <Services />
              <Tours />
              <Gallery /> 
              <Stats />
            </>
          }
        />

        {/* ------- ADMIN GALLERY CRUD ROUTE ------- */}
        <Route path="/admin/gallery" element={<GalleryCrud />} />

      </Routes>
    </Router>
  );
}

export default App;
