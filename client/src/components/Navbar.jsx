import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link to="/home">
        <h1>Henry PI Videogames</h1>
        <button>Go Home</button>
      </Link>
      <br></br>
      <Link to="/home/share">
        <button>Share Videogames📼</button>
      </Link>
    </>
  );
}
