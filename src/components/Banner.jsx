import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../axios";
import requests from "../requests";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return requests;
    }

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const movieClickHandler = (tmdbId, category) => {
    navigate(`/movie/${tmdbId}?category=${category}`);
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <button className="banner__button" onClick={() => navigate("/mylist")}>
          My Lists
        </button>
        <button
          className="banner__button"
          onClick={() => movieClickHandler(movie.id, "tv")}
        >
          Play
        </button>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
