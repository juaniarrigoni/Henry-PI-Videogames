import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videogamesDetail } from "../redux/actions";

export default function Detail() {
  const detailedGame = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => dispatch(videogamesDetail(id), [dispatch, id]));
  console.log(detailedGame.background_image);
  return (
    <>
      {!(detailedGame.id === id) ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Link to={"/home"} onClick={() => history.goBack()}>
            <button className="button_detail">HOME</button>
          </Link>
          <div>
            <h1>{detailedGame.name}</h1>
            <img src={detailedGame.background_image} alt={detailedGame.name} />
            <h2>Rating: ⭐{detailedGame.rating}</h2>
            <div>
              <h2>Plataforms:</h2>
              <h3>{detailedGame.platforms?.map((p) => p).join(", ")}</h3>
            </div>
            <h4 style={{ margin: "20px" }}>
              {detailedGame.name} was released on {detailedGame.released}
            </h4>
            <div>
              <h2>Genres: </h2>
              <h3>{detailedGame.genres?.map((g) => g).join(", ")}</h3>
            </div>
            <p>{detailedGame.description.replaceAll(/<[^>]*.?/g, "")}</p>
          </div>
        </>
      )}
    </>
  );
}
