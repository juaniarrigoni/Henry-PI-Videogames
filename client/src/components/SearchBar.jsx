import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../redux/actions";
import "../styles/SearchBarStyle.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      alert("Please enter a videogame");
    } else {
      dispatch(getVideogameByName(name)); //name es lo q está escribiendo el usuario
      setName("");
    }
  }

  return (
    <div className="searchContainer">
      <input
        className="search"
        type="text"
        value={name}
        placeholder="Search videogame ..."
        onChange={(e) => handleInputChange(e)}
      />

      <button
        className="searchBtn"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        🔎
      </button>
    </div>
  );
}
