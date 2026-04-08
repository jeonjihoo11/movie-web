import { Routes, Route, useNavigate } from "react-router-dom";

import MovieDetail from "./MovieDetail.jsx";
import { BASE_URL, options } from "./component/API";
import "./App.css";
import Layout from "./component/LayOut.jsx";
import MovieCard from "./MovieCard.jsx";
import { useEffect, useState } from "react";
import SearchPage from "./component/SearchPage.jsx";

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular`, options)
      .then((res) => res.json())
      .then((data) => setMovies(data.results.filter((movie) => !movie.adult)));
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handleCardClick(movie.id)}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchPage />} />

        {/* 무한 스크롤*/}
      </Route>
    </Routes>
  );
}
