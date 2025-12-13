import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Tours from "./components/Tours";
import ContactUs from "./components/ContactUs";
// Public gallery (viewer only)
import Gallery from "./components/Gallery";

// Admin gallery (CRUD)
import GalleryCrud from "./components/GalleryCrud";
import ServicesCrud from "./components/ServicesCrud";
import ToursCrud from "./components/ToursCrud";
import AdminLayout from './components/AdminLayout';


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
              <ContactUs />
            </>
          }
        />

        {/* ------- ADMIN GALLERY CRUD ROUTE ------- */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="gallery" element={<GalleryCrud />} />
          <Route path="services" element={<ServicesCrud />} />
          <Route path="tours" element={<ToursCrud />} />
          {/* <Route path="bookings" element={<Bookings />} /> */}
          
        </Route>
        

      </Routes>
    </Router>
  );
}

export default App;
