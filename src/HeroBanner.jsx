function HeroBanner({ movie }) {
  if (!movie) return null;
  return (
    <div className="relative h-[500px] md:h-[600] w-full bg-black overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src={"`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"}
        alt={movie.title}
      />
      {/* 2그라데이션: 렌더링과 자연스럽게 이어지는부분*/}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      {/* 3.이름 별점 소개란*/}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 gap-4">
        {/* 별점*/}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-2xl">*</span>
          <span className="text-white text-2xl font-bold">
            {movie.vote_avveage}
          </span>
        </div>

        {/* 영화 제목*/}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl">
          {movie.title}
        </h1>
        {/* 영화 소개*/}
        <p className="text-gray-300 md:text-xl max-w-2xl leading-relaxed line-clamp-3 ">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
export default HeroBanner;
