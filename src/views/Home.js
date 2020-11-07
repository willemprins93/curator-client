import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      <img id="logo" src="/images/logo-2.png" alt="logo" />
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
