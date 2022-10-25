import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBarStyle.css";

export default function Navbar() {
  return (
    <>
      <Link to="/home">
        <h1 className="navBarTitle">Henry PI Videogames</h1>
      </Link>
      <Link to="/create">
        <div className="navCreateContainer">
          <button className="navCreateBtn">Share Videogames📼</button>
        </div>
      </Link>
    </>
  );
}
