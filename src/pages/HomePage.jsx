import React from "react";
import "./HomePage.css";
import heroImage from "../assets/hero.jpg";

const HomePage = () => {
  return (
    <div className="hero">
      <div className="overlay">
        <h1>Liberty Soldiers</h1>
        <p>Seeking truth, defending Torah, fighting deception.</p>
        <div className="verses">
          <p>
            “And you will know the truth, and the truth will set you free.”
            <br />
            <span className="verse-ref">— John 8:32</span>
          </p>
          <p>
            “Be strong and courageous. Do not be afraid or terrified because of them,
            for Yahweh your Elohim goes with you; He will never leave you nor forsake you.”
            <br />
            <span className="verse-ref">— Deuteronomy 31:6</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
