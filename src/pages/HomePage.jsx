import React from 'react';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Hero Image Section */}
      <div
        style={{
          backgroundImage: "url('/hero.jpg')", // update path if needed
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "10vh",
          position: "relative",
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

        <p style={{
          fontSize: "1.5rem",
          color: "white",
          marginTop: "1rem",
          textShadow: "1px 1px black"
        }}>
          Seeking truth, defending Torah, fighting deception.
        </p>

        {/* Verse Overlay */}
        <p style={{
          marginTop: "2rem",
          fontSize: "1rem",
          color: "#f0f0f0",
          maxWidth: "80%",
          textShadow: "1px 1px #000",
          fontStyle: "italic"
        }}>
          “Be strong and courageous. Do not be afraid or terrified because of them, for Yahweh your Elohim is the one who goes with you; He will not leave you or forsake you.” — Deuteronomy 31:6
        </p>
      </div>

      {/* Welcome Message */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          color: "white"
        }}
      >
        <h2 style={{ color: "tan", textAlign: "center", marginBottom: "1rem" }}>Welcome</h2>
        <p><strong>“And you will know the truth, and the truth will set you free.”</strong> — <em>John 8:32 (LEB)</em></p>
        <p>
          Welcome to <strong>Liberty Soldiers</strong>. Our mission is to bring liberty from deception, fear, and misinformation
          passed down by mainstream religion for nearly 2000 years. These teachings were shaped more by councils and empires than Scripture itself.
        </p>
        <p>
          Since 325 AD at the First Council of Nicaea, man-made doctrines infused with paganism and Greek philosophy have been enforced
          by religious and political systems. Doctrines such as the Trinity, abolished Torah, and heaven-at-death theology were never taught
          by the Messiah or His disciples.
        </p>
        <p><strong>“And in vain do they worship me, teaching as doctrines the commandments of men.”</strong> — <em>Matthew 15:9 (LEB)</em></p>
        <p>We aim to return to what the Scriptures actually say — exposing false doctrines like:</p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>The Trinity</li>
          <li>The Rapture</li>
          <li>The Law Is Abolished</li>
          <li>Dispensationalism</li>
          <li>The soul goes to heaven upon death</li>
        </ul>
        <p><strong>“For the mystery of lawlessness is already at work…”</strong> — <em>2 Thessalonians 2:7 (LEB)</em></p>
        <p>These deceptions exist not just in churches but in entertainment, news, and daily culture — embedded deep in our subconscious.</p>
        <p>We understand it's hard to admit we’ve been deceived. You may feel discomfort, or cognitive dissonance, as you begin waking up. But you’re not alone.</p>
        <p><strong>“For God did not give us a spirit of fear, but of power and love and self-control.”</strong> — <em>2 Timothy 1:7 (LEB)</em></p>
        <p><strong>“Do not be conformed to this present world, but be transformed by the renewal of your mind…”</strong> — <em>Romans 12:2 (LEB)</em></p>
        <p>Be brave. Stand tall. Challenge what you’ve been taught. We welcome you to the fight for true liberty — found only through the truth of Yahweh.</p>
      </div>
    </div>
  );
};

export default HomePage;
