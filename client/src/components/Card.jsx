import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, background_image, name, genres, rating }) {
  return (
    <>
      <Link to={`home/` + id}>
        <img src={background_image} alt={name} width="200px" height="250px" />
        <h3>{name}</h3>
        <h4>Genres: </h4>
        <h5>{genres.join(", ")}</h5>
        <h4>Rating: </h4>
        <h5>{rating}</h5>
        <button>More about this game!</button>
      </Link>
    </>
  );
}
