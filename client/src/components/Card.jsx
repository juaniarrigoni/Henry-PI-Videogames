import React from "react";
import { Link } from "react-router-dom";
import "../styles/CardStyle.css";

export default function Card({ id, background_image, name, genres, rating }) {
  return (
    <>
      <li className="cardContainer">
        <Link to={`home/` + id}>
          <h3 className="cardName">{name}</h3>
          <img className="cardImg" src={background_image} alt={name} />
          <h4 className="cardGenreTitle">Genres: </h4>
          <h5 className="cardGenres">{genres.join(", ")}</h5>
          <h4 className="cardRatingTitle">Rating: </h4>
          <h5 className="cardRating">{rating}</h5>
        </Link>
      </li>
    </>
  );
}

//<button className="cardBtn">More about this game!</button>
