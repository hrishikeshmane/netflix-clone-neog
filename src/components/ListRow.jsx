import React from "react";
import "./Row.css";
import { useNavigate } from "react-router-dom";

export default function ListRow({ title, movieList }) {
  const navigate = useNavigate();

  const baseURL = "https://image.tmdb.org/t/p/original";

  const movieClickHandler = (tmdbId, category) => {
    navigate(`/movie/${tmdbId}?category=${category}`);
  };

  return (
    <div className="row">
      <h3>{title}</h3>
      <div className="row__posters">
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <div
              key={movie.id}
              className={`row__container row__containerLarge`}
              onClick={() => movieClickHandler(movie.id, movie.category)}
            >
              <img
                loading="lazy"
                src={`${baseURL}${movie.poster_path}`}
                alt={movie?.title || movie?.name || movie?.original_name}
              />
              <div className="row__posterName">
                <p>{movie?.title || movie?.name || movie?.original_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="row__empty">This list is empty</p>
        )}
      </div>
    </div>
  );
}
