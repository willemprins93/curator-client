import React from "react";
import { Link } from "react-router-dom";
const images = require("../logoImages.json");

const Home = () => {
  const logoImage = images[Math.floor(Math.random() * images.length)];
  return (
    <div className="home-page">
      <h1
        className="main-logo"
        style={{
          background: `url(${logoImage})`,
        }}
      >
        CURATOR
      </h1>
      <p id="subtitle" style={{ textAlign: "center" }}>
        Discover art from around the world!
      </p>
      <Link className="menu-nav" to="/login">
        Log In
      </Link>
      <Link className="menu-nav" to="/signup">
        Sign Up
      </Link>
    </div>
  );
};

export default Home;
