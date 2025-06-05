import React from "react";
import heroImage from "../assets/hero.jpg";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "contain",
        backgroundColor: "black",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "40px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontFamily: "'stencil', 'Arial Black', sans-serif",
          textShadow: "2px 2px 0 black",
          color: "tan",
          marginBottom: "10px",
        }}
      >
        LIBERTY SOLDIERS
      </h1>
      <p
        style={{
          fontSize: "1rem",
	  fontFamily: "'stencil', 'Arial Black', sans-serif",
          color: "tan",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
        Seeking truth, defending Torah & fighting deception
      </p>
    </div>
  );
};

export default HomePage;

