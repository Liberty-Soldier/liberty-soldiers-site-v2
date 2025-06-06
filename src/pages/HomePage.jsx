import React from 'react';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Hero Image Section */}
      <div
        style={{
          backgroundImage: "url('/your-hero-image.jpg')", // <-- Replace with your actual image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "10vh"
        }}
      >
        <h1 style={{
          fontFamily: "Staatliches, sans-serif",
          fontSize: "4rem",
          color: "tan",
          textShadow: "2px 2px black"
        }}>
          Liberty Soldiers
        </h1>

        <p style={{ fontSize: "1.5rem", color: "white", marginTop: "1rem" }}>
          Seeking truth, defending Torah, fighting deception.
        </p>
      </div>

      {/* Welcome Message */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        fontSize: "1.2rem",
        lineHeight: "1.8",
        color: "white"
      }}>
        <h2 style={{ color: "tan", textAlign: "center", marginBottom: "1rem" }}>Welcome</h2>
        <p>
          Our mission is to give you liberty from the lies, deception, and misinformation that the mainstream church has
          perpetrated on the masses for the last 2,000 years. The lies crept in early and have been with the people who call
          themselves Christians and church leaders from the very beginning. These leaders have pushed unbiblical beliefs onto
          those genuinely seeking the truth.
        </p>
        <p style={{ marginTop: "1rem" }}>
          These lies were codified and promoted through government and world religious systems starting in 325 AD at the
          First Council of Nicaea. Once these man-made traditions—infused with paganism and philosophy—were agreed upon,
          both religious and governmental authorities began enforcing them on the masses seeking the Most High, using
          punishment, force, and excommunication from the so-called “church.”
        </p>
        <p style={{ marginTop: "1rem" }}>
          Our goal is to cut through these lies and shine a light on the truth found in the Scriptures.
        </p>
        <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
          “For God has not given us a spirit of fear, but of power, love, and a sound mind.” — 2 Timothy 1:7<br />
          “You will know the truth, and the truth will set you free.” — John 8:32<br />
          “See to it that no one takes you captive through philosophy and empty deception, according to human tradition…” — Colossians 2:8
        </p>
      </div>
    </div>
  );
};

export default HomePage;
