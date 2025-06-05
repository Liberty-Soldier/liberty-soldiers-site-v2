import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComingSoon from "./pages/ComingSoon";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "10px", backgroundColor: "#111", color: "white" }}>
          <Link to="/" style={{ color: "white" }}>Home</Link>
          <Link to="/news" style={{ color: "white" }}>News</Link>
          <Link to="/devotional" style={{ color: "white" }}>Devotional</Link>
          <Link to="/persecution-map" style={{ color: "white" }}>Persecution Map</Link>
          <Link to="/media" style={{ color: "white" }}>Media</Link>
          <Link to="/community" style={{ color: "white" }}>Community</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<ComingSoon title="News & Alerts" />} />
          <Route path="/devotional" element={<ComingSoon title="Devotional" />} />
          <Route path="/persecution-map" element={<ComingSoon title="Persecution Map" />} />
          <Route path="/media" element={<ComingSoon title="Videos & Podcasts" />} />
          <Route path="/community" element={<ComingSoon title="Community Forum" />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

