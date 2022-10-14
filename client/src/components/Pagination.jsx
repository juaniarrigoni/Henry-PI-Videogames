import React from "react";
// import "../styles/PaginationStyle.css";

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
    <nav>
      {/* <h4>You are in page {pageNumbers}</h4> */}
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
