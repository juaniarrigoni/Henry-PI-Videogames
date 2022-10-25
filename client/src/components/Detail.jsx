import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videogamesDetail } from "../redux/actions";
import "../styles/DetailStyle.css";

export default function Detail() {
  const detailedGame = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => dispatch(videogamesDetail(id)), [dispatch, id]);

  return (
    <>
      {!(detailedGame.id === id) ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="detailBorder">
          <Link to={"/home"} onClick={() => history.goBack()}>
            <button className="detailHomeBtn">HOME</button>
          </Link>
          <div className="detailInfoContainer">
            <h1 className="detailName">{detailedGame.name}</h1>
            <img
              className="detailImg"
              src={detailedGame.background_image}
              alt={detailedGame.name}
              height="400"
              width="450px"
            />
            <br />
            <h2 className="detailRating">Rating: ⭐{detailedGame.rating}</h2>
            <br />
            <div>
              <h3 className="detailTitlePlatforms">Platforms:</h3>
              <h4 className="detailPlatforms">
                {detailedGame.platforms?.map((p) => p.name).join(", ")}{" "}
              </h4>
            </div>
            <div>
              <h3 className="detailTitleGenres">Genres: </h3>
              <h4 className="detailGenres">
                {detailedGame.genres?.map((g) => g.name).join(", ")}
              </h4>
            </div>
            <div>
              <h3 className="detailReleased">
                {detailedGame.name} was released on {detailedGame.released}
              </h3>
            </div>
            <p className="detailDescription">
              {detailedGame.description.replaceAll(/<[^>]*.?/g, "")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
