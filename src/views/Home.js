import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Curator</h1>
      <p style={{ textAlign: "center" }}>Discover art from around the world!</p>
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
