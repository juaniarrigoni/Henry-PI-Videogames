import React from "react";
import "../styles/PaginationStyle.css";

export default function Pagination({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = []; // se crea un arreglo que es la cantidad de paginas que se muestran

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  //hacemos que se recorra el arreglo, cortando cada vez que se reendericen los quince paises
  //el resultado es la cantidad de paginas que habra, las pusheamos al arreglo

  return (
    <>
      <div className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="numberContainer">
              <button className="number" onClick={() => paginado(number)}>
                {number}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
