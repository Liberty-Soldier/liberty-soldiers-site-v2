import React from "react";

const ComingSoon = ({ title }) => {
  return (
    <div style={{ color: "white", backgroundColor: "black", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>{title}</h1>
      <p>Coming soon...</p>
    </div>
  );
};

export default ComingSoon;
