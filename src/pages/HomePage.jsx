import React from "react";
import heroImage from "../assets/hero.jpg"; // Make sure the path is correct

const HomePage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #000000, #222222, #000000)",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "contain",
          backgroundColor: "black",
          height: "100vh",
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "tan", textShadow: "2px 2px black" }}>
          Liberty Soldiers
        </h1>
        <p style={{ fontSize: "1.5rem", color: "white", marginTop: "1rem" }}>
          Seeking truth, defending Torah, fighting deception.
        </p>
      </div>
    </div>
  );
};

export default HomePage;


