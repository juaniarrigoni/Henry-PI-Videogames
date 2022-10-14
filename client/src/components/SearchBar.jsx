import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault(e);
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(getVideogamesByName(name));
  }
  return (
    <>
      <input
        type="text"
        placeholder="Look for a videogame!"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onSubmit={(e) => handleSubmit(e)}>
        🔍
      </button>
    </>
  );
}
