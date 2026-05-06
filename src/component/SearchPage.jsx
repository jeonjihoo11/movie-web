import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, options } from "./API";
import MovieCard from "../MovieCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;

    fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      options,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error("검색 에러:", err));
  }, [query]);

  return (
    // 1. 전체 배경을 블랙으로 조지기
    <div className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* 2. 검색어 제목 간지나게 넣기 */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="text-zinc-500 text-2xl block mb-2">
              Search Results for:
            </span>
            "{query}"
          </h1>
          <p className="text-zinc-500 mt-2">
            {movies.length}개의 영화를 찾았습니다
          </p>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-xl">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
