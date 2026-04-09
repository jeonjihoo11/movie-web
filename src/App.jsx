import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import { BASE_URL, options } from "./component/API";
import "./App.css";
import Layout from "./component/LayOut.jsx";
import MovieCard from "./MovieCard.jsx";
import { useEffect, useState } from "react";
import SearchPage from "./component/SearchPage.jsx";
import MovieDetail from "./Moviedetail.jsx";

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
      {/* 레이아웃 영향을 받는 페이지들 */}
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchPage />} />

        {/* 레이아웃 밖으로 독립시킨 회원가입 페이지! */}
        <Route path="/singup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
