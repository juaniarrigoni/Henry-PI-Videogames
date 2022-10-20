import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getAllGenres } from "../redux/actions";

export default function Form() {
  return (
    <>
      <Link to="/home">
        <h1>Henry PI Videogames</h1>
        <button>Go Home</button>
      </Link>
    </>
  );
}
