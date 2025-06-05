import React from "react";

const heroImage = "/hero.jpg"; // ✅ Public path

const HomePage = () => {
  return (
    <div
  style={{
    backgroundColor: "black",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
  }}
>
  <img
    src={heroImage}
    alt="Hero"
    style={{
      width: "100%",
      height: "auto",
      objectFit: "cover",
      objectPosition: "top",
    }}
  />
  <div
    style={{
      position: "absolute",
      top: "40px",
      width: "100%",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "3rem", color: "tan", textShadow: "2px 2px black" }}>Liberty Soldiers</h1>
    <p style={{ fontSize: "1.5rem", color: "white", marginTop: "1rem" }}>
      Seeking truth, defending Torah, fighting deception.
    </p>
  </div>
</div>

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




