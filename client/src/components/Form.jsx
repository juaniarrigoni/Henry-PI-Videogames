import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAllGenres, getAllPlatforms, postVideogame } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/FormStyle.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name required";
  }
  if (!input.description) {
    errors.description = "Complete description";
  }
  if (!input.rating || input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating valid 0 - 5";
  }
  if (!input.released) {
    errors.released = "Complete date";
  } else if (
    !/^(?:3[01]|[12][0-9]|0?[1-9])([-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(
      input.released
    )
  ) {
    //eslint-disable-line
    errors.released = "Format error (dd//mm/yy)";
  } else {
    errors.released = "";
  }
  if (input.platforms.length < 1) {
    errors.platforms = "Enter platforms";
  } else {
    errors.platforms = "";
  }
  if (input.genres.length < 1) {
    errors.genres = "Enter genres";
  } else {
    errors.platforms = "";
  }
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();

  const genres = useSelector((state) => state.allGenres);
  const platforms = useSelector((state) => state.allPlatforms);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    background_image: "",
    genres: [],
    platforms: [],
  });

  //----------Inputs---------
  function handleInputChange(e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  //-----Select genres----
  function handleGenreSelect(e) {
    setInput({
      ...input,
      genres: [[...new Set([...input.genres, e.target.value])]],
    });
    setErrors(
      validate({
        ...input,
        [e.target.genres]: e.target.value,
      })
    );
  }
  //-----Select platfroms----
  function handlePlatformsSelect(e) {
    setInput({
      ...input,
      platforms: [[...new Set([...input.platforms, e.target.value])]],
    });

    setErrors(
      validate({
        ...input,
        [e.target.platforms]: e.target.value,
      })
    );
  }

  //---------Send form--------
  function handleSubmit(e) {
    if (input.name === "") {
      e.preventDefault();
      alert("You should complete the form correctly");
    } else {
      e.preventDefault();
      dispatch(postVideogame(input));
      alert("Videogame created!!");
      setInput({
        name: "",
        description: "",
        platforms: "",
        released: "",
        rating: "",
        background_image: "",
        genres: [],
        platforms: [], //eslint-disable-line
      });
      history.push("/home");
    }
  }

  //---------Delete genres---------
  function handleGenreDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== el),
    });
  }

  //---------Delete platforms--------
  function handlePlatformDelete(el) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platform) => platform !== el),
    });
  }

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  return (
    <div className="formContainer">
      <Link to="/home">
        <h1 className="navBarTitle">Henry PI Videogames</h1>
      </Link>
      <h1 className="formTitle">CREATE GAME</h1>
      <form className="formForm" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="formLabel">Name</label>
          <input
            className="formInput"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.name && <p className="formDanger"> {errors.name} </p>}
        </div>

        <div>
          <label className="formLabel">Rating</label>
          <input
            className="formInput"
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.rating && <div className="formDanger"> {errors.rating} </div>}
        </div>

        <div>
          <label className="formLabel">Release Date</label>
          <input
            className="formInput"
            type="text"
            value={input.released}
            name="released"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.released && (
            <div className="formDanger"> {errors.released} </div>
          )}
        </div>

        <div>
          <label className="formLabel">Image:</label>
          <input
            className="formInputImg"
            type="url"
            name="background_image"
            value={input.background_image}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="formDescriptionContainer">
          <label className="formLabel">Description</label>
          <textarea
            type="text"
            value={input.inputDescription}
            name="description"
            onChange={(e) => handleInputChange(e)}
            rows="5"
            cols="45"
          />
          {errors.description && (
            <p className="formDanger"> {errors.description} </p>
          )}
        </div>
        <div className="formPlatforms">
          <label className="formLabelPlatforms">Platforms</label>
          <select
            className="formSelect"
            onChange={(e) => handlePlatformsSelect(e)}
          >
            <option>Select</option>
            {platforms.map((e) => (
              <option value={e.name}> {e.name} </option>
            ))}
          </select>
          {input.platforms.map((e) => (
            <div>
              <li className="formLi">
                {e}
                <button
                  className="formCloseBtn"
                  type="button"
                  onClick={() => handlePlatformDelete(e)}
                >
                  X
                </button>
              </li>
            </div>
          ))}
          {errors.platforms && (
            <p className="formDanger"> {errors.platforms} </p>
          )}
        </div>
        <div className="formGenres">
          <label className="formLabelGenres">Genres</label>
          <select className="formSelect" onChange={(e) => handleGenreSelect(e)}>
            <option>Select</option>
            {genres.map((e) => (
              <option value={e.name}> {e.name} </option>
            ))}
          </select>
          <ul>
            {input.genres.map((e) => (
              <div>
                <li className="formLi">
                  {e}
                  <button
                    className="formCloseBtn"
                    type="button"
                    onClick={() => handleGenreDelete(e)}
                  >
                    X
                  </button>
                </li>
              </div>
            ))}
          </ul>
          {errors.genres && <p className="formDanger"> {errors.genres} </p>}
        </div>
        {errors &&
        (errors.name ||
          errors.rating ||
          errors.description ||
          errors.genres ||
          errors.platforms) ? (
          <p className="formBtnDanger">Complete Form</p>
        ) : (
          <button type="submit" className="formSubmitButton">
            ADD VIDEOGAME
          </button>
        )}
      </form>
    </div>
  );
}
