import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import { BASE_URL, options } from "./component/API";
import Layout from "./component/LayOut.jsx";
import MovieCard from "./MovieCard.jsx";
import { useEffect, useState } from "react";
import SearchPage from "./component/SearchPage.jsx";
import MovieDetail from "./MovieDetail.jsx";
import LogIn from "./pages/LogIn.jsx";
import About from "./component/About.jsx";

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태 추가

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  // 초기 데이터 및 페이지 변경 시 데이터 로드
  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?language=ko-KR&page=${page}`, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies((prev) => [...prev, ...data.results.filter((movie) => !movie.adult)]);
      });
  }, [page]);

  // 무한스크롤 스크롤 감지 로직
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (movies.length === 0)
    return (
      <div className="bg-black min-h-screen text-white p-10">
        영화 불러오는 중...
      </div>
    );

  const mainMovie = movies[0];

  return (
    <div className="bg-black min-h-screen">
      {/* 1. 히어로 배너 섹션  */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${mainMovie.backdrop_path}`}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="배너 배경"
        />
        {/* 배너 하단 그라데이션  */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-white text-2xl font-bold">
              {mainMovie.vote_average.toFixed(1)}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white">
            {mainMovie.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl line-clamp-3">
            {mainMovie.overview}
          </p>
        </div>
      </section>

      {/* 인기 영화 리스트 */}
      <section className="px-10 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">인기 영화</h2>

        {/* 4개씩 정렬 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleCardClick(movie.id)}
            />
          ))}
        </div>
      </section>
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
        <Route path="/singup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}