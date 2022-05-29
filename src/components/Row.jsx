import axios from "../axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
import { useNavigate } from "react-router-dom";

export default function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const baseURL = "https://image.tmdb.org/t/p/original";

  const movieClickHandler = (tmdbId, category) => {
    navigate(`/movie/${tmdbId}?category=${category}`);
  };

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchURL);
      setMovies(requests.data.results);
      return requests;
    }

    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div
                key={movie.id}
                className={`row__container ${
                  isLargeRow && "row__containerLarge"
                }`}
                onClick={() =>
                  movieClickHandler(movie.id, isLargeRow ? "tv" : "movie")
                }
              >
                <img
                  loading="lazy"
                  src={`${baseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie?.title || movie?.name || movie?.original_name}
                />
                <div className="row__posterName">
                  <p>{movie?.title || movie?.name || movie?.original_name}</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
