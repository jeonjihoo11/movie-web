import { useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { BASE_URL, options } from "./API";
import MovieCard from "../MovieCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("query");

  const page = searchParams.get("page");

  useEffect(() => {
    fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      options,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [query]);

  return (
    <>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
