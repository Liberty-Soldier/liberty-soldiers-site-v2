import React from "react";
import heroImage from "../assets/hero.jpg";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover", // Ensures full screen and no zoom effect
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "tan", textShadow: "2px 2px black" }}>
        Liberty Soldiers
      </h1>
      <p style={{ fontSize: "1.5rem", color: "white", marginTop: "1rem" }}>
        Seeking truth, defending Torah, fighting deception.
      </p>
    </div>
  );
};

export default HomePage;
