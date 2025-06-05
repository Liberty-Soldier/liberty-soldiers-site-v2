
import React from "react";
import heroImage from "../public/hero.jpg"; 

const HomePage = () => {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <img
        src={heroImage}
        alt="Hero"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "40px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "tan", textShadow: "2px 2px black" }}>Liberty Soldiers</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          Seeking truth, defending Torah, fighting deception.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
