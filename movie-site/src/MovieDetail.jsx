import { useEffect, useState } from "react";

import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { BASE_URL, options } from "./component/API";
export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}`, options)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);
  if (!movie) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="movie-detail-container">
      <img
        className="movie-poster"
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
      />
      alt={movie.title}
      {/* 찜버튼 추가 */}
      {/* 평점 버튼*/}
      {/* 모달 */}
      <div className="movie-info">
        <div className="movie-info-top">
          <h1>{movie.title}</h1>
          <p>{movie.vote_average}</p>
        </div>
        <div className="movie-info-bottom">
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
