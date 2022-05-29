import React from "react";
import "./HomeScreen.css";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../requests";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />

      <LazyLoadComponent>
        <Row
          title="Netflix Originals"
          fetchURL={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movie" fetchURL={requests.fetchComedyMovies} />
        <Row title="Romance Movie" fetchURL={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
      </LazyLoadComponent>
    </div>
  );
}

export default HomeScreen;
