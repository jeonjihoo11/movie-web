import "./MovieCard.css";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={baseUrl + movie.poster_path} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.vote_average}</p>
    </div>
  );
}
export default MovieCard;
