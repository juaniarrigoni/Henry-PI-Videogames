/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getAllGenres,
  getAllPlatforms,
  orderByName,
  orderByRating,
  filterByCreation,
  filterByGenre,
  filterByUnusualGenres,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Card from "./Card";
import "../styles/HomeStyle.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.allGenres);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
  }
  /////-----ESTADO PARA LAS FUNCIONES-----/////
  const [order, setOrder] = useState("");

  /////-----PAGINADO-----/////
  const [currentPage, setCurrentPage] = useState(1); // estado que define en que pagina estamos
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); // estado que define cantidad de paises por pagina
  const indexOfLastVideogame = currentPage * videogamesPerPage; // constante para saber el ultimo pais de nuestar pagina
  const indexOfFisrtVideogame = indexOfLastVideogame - videogamesPerPage; // constante para saber el primer pais de nuestra pagina
  const currentVideogames = allVideogames.slice(
    indexOfFisrtVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); // funcion para cambiar el image.pngpaginado
  };

  /////-----FUNCIONES-----/////
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterByCreation(e) {
    dispatch(filterByCreation(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }
  function handleFilterByGenre(e) {
    e.preventDefault(e);
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="homeReloadBtnContainer">
        <button className="homeReloadBtn" onClick={(e) => handleClick(e)}>
          Bring back all Videogames 🎮
        </button>
      </div>
      <br></br>
      <SearchBar />
      <div className="homePagination">
        <Pagination
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
      </div>
      <h4 className="homePaginationText">You are in page {currentPage}</h4>

      <div className="filterContainer">
        <div className="filter">
          <select className="select" onChange={(e) => handleFilterByGenre(e)}>
            <option value="all">All genres</option>
            {allGenres.map((genres) => {
              return (
                <option key={genres.name} value={genres.name}>
                  {genres.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="filter">
          <select
            className="select"
            onChange={(e) => handleFilterByCreation(e)}
          >
            <option value="all">All videogames</option>
            <option value="uploaded">Uploaded</option>
            <option value="existent">Existent</option>
          </select>
        </div>
        <div className="filter">
          <select className="select" onChange={(e) => handleOrderByName(e)}>
            <option value="all">Order</option>
            <option value="ascAlph">Ascending alphabetically</option>
            <option value="descAlph">Descending alphabetically</option>
          </select>
        </div>
        <div className="filter">
          <select className="select" onChange={(e) => handleOrderByRating(e)}>
            <option value="all">Rating</option>
            <option value="ascRat">Ascending by Rating</option>
            <option value="descRat">Descending by Rating</option>
          </select>
        </div>
      </div>
      <div className="cardsMainContainer">
        <ul className="homeCardGrid">
          {currentVideogames?.map((el) => {
            return (
              <div key={el.id}>
                <Link to={`/home/${el.id}`}>
                  <Card
                    id={el.id}
                    name={el.name}
                    background_image={el.background_image}
                    genres={el.genres}
                    rating={el.rating}
                  />
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
