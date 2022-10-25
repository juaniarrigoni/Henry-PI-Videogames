import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingStyle.css";

export default function Landing() {
  return (
    <div className="landingPage">
      <h1 className="landingTitle">Welcome to my Henry PI Videogames</h1>
      <Link to="/home">
        <button className="landingBtn">Enter</button>
      </Link>
    </div>
  );
}
