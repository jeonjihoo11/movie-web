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
      console.log("내 아이디로 찜 목록 찾는 중:", currentUser.id);

      // ?userId=아이디 를 붙여서 내 것만 쏙 빼오기
      fetch(`http://localhost:4000/favorites?userId=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("불러온 내 찜 영화들:", data);
          setFavorites(data);
        });
    }
  }, []);

  if (!allUsers)
    return <div className="p-10 text-center">로그인 해주세요! 🔒</div>;
  const deleteFav = (id) => {
    fetch(`http://localhost:4000/favorites/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          const updated = favorites.filter((item) => item.id !== id);
          setFavorites(updated);
          alert("찜목록에서 삭제");
        }
      })
      .catch((err) => console.log("에러", err));
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-6">내가 찜한 영화 🎬</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold truncate">{movie.title}</h3>
                <button
                  className="px-3 py-1 text-xs border border-zinc-700 text-zinc-400 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                  onClick={() => deleteFav(movie.id)}
                >
                  삭제하기
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">찜한 영화가 없습니다</p>
        )}
      </div>
    </div>
  );
}

export default About;
