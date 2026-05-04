import { useEffect, useState } from "react";

function About() {
  const [favorites, setFavorites] = useState([]);
  const allUsers = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("user"));
    const currentUser = Array.isArray(allUsers)
      ? allUsers[allUsers.length - 1]
      : allUsers;

    if (currentUser && currentUser.id) {
      fetch(`http://localhost:4000/favorites?userId=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
        });
    }
  }, []);

  const deleteFav = (id) => {
    fetch(`http://localhost:4000/favorites/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updated = favorites.filter((item) => item.id !== id);
          setFavorites(updated);
        }
      })
      .catch((err) => console.log("에러", err));
  };

  if (!allUsers)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans">
        <div className="text-center bg-zinc-900 p-10 rounded-3xl border border-zinc-800">
          <p className="text-2xl font-bold mb-4">로그인 해주세요! 🔒</p>
          <p className="text-zinc-500">찜 목록을 확인하려면 로그인이 필요해.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-10 tracking-tighter">
          내가 찜한 영화 🎬
        </h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-500 transition-all duration-300"
              >
                <div className="overflow-hidden aspect-[2/3]">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 하단 정보창 */}
                <div className="p-5">
                  <h3 className="font-bold text-lg truncate mb-3">
                    {movie.title}
                  </h3>
                  <button
                    className="w-full py-2 text-sm font-semibold bg-zinc-800 text-zinc-400 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300"
                    onClick={() => deleteFav(movie.id)}
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
            <p className="text-zinc-500 text-xl">찜한 영화가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
