import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
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
