import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Welcome to my Henry PI Videogames</h1>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </div>
  );
}
