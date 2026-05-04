import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { BASE_URL, options } from "./component/API";
import ReviewModal from "./ReviewModal";

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달
  const [isEditMode, setIsEditMode] = useState(false); //수정중인지
  const [selectedReview, setSelectedReview] = useState(null); //어떤 리뷰를 고칠건지
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("영화데이터", data);
        setMovie(data);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      const saved = localStorage.getItem(`reviews_${id}`);
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews([]);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const handleFavorite = async (e) => {
    if (e) e.preventDefault();
    console.log("찜하기 버튼 클릭됨!");

    // 1. 로컬스토리지에서 유저 데이터 가져오기
    const allUsers = JSON.parse(localStorage.getItem("user"));
    const currentUser = Array.isArray(allUsers)
      ? allUsers[allUsers.length - 1]
      : allUsers;
    if (!currentUser || !currentUser.id) {
      alert("로그인 정보가 이상해! 다시 로그인해줘.");
      return;
    }

    // 3. 서버에 보낼 찜 데이터 구성 (주소 꼭 확인!)
    const favoriteData = {
      userId: currentUser.id, // 여기에 유저 아이디가 들어가야 함!
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    };

    console.log("보낼 데이터 확인:", favoriteData);

    try {
      const res = await fetch("http://localhost:4000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteData),
      });

      if (res.ok) {
        alert("찜 성공! ");
      } else {
        console.error("서버 응답 에러:", res.status);
      }
    } catch (err) {
      console.error("네트워크 에러:", err);
    }
  };

  // 리뷰 추가 시 기록
  const addReview = (text, clickedStarNum, userId) => {
    const newReview = {
      id: Date.now(),
      comment: text,
      clickedStarNum: clickedStarNum,
      userId: userId,
      data: new Date().toLocaleDateString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
  };
  //리뷰수정을 완료하는
  const handleUpdate = (newText, newStar) => {
    console.log("2. 부모가 받은 글자", newText);
    console.log("3.수정할 놈의 인덱스", selectedReview?.index);

    if (!selectedReview || selectedReview.index === undefined) return;

    const updatedReview = [...reviews];

    updatedReview[selectedReview.index] = {
      ...updatedReview[selectedReview.index],
      comment: newText,
      clickedStarNum: newStar,
    };

    setReviews(updatedReview);

    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReview));

    setSelectedReview(null);
    setIsModalOpen(false);
  };

  const deleteReview = (targetIndex) => {
    const newReviews = reviews.filter((_, i) => i !== targetIndex);
    setReviews(newReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(newReviews));
  };

  if (!movie) return <div className="loading">영화 정보를 불러오는 중...</div>;

  const editReview = (index) => {
    setSelectedReview({
      index: index,
      content: reviews[index].comment,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16">
      {/* 1. 상단 섹션 (포스터 + 정보창) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 mb-20">
        {/* 왼쪽 포스터 */}
        <div className="w-full md:w-[400px] flex-shrink-0">
          <img
            className="w-full rounded-2xl shadow-2xl border border-zinc-800"
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
          />
        </div>

        {/* 오른쪽 정보창 */}
        <div className="flex flex-1 flex-col gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              {movie.title}
            </h1>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="text-yellow-400">★</span>
              <p className="text-gray-200">{movie.vote_average?.toFixed(1)}</p>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-4 text-zinc-300">줄거리</h3>
            <p className="text-gray-400 text-lg leading-relaxed italic mb-8">
              {movie.overview}
            </p>

            {/* 버튼들 - 줄거리 박스 안쪽 하단에 배치 */}
            <div className="flex gap-4 mt-auto">
              <button
                type="button"
                onClick={handleFavorite}
                className="flex-1 bg-white hover:bg-sky-100 text-black font-bold py-4 rounded-xl transition-all"
              >
                찜하기
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsEditMode(null);
                  setSelectedReview(null);
                }}
                className="flex-1 bg-white hover:bg-sky-100 text-black font-bold py-4 rounded-xl transition-all"
              >
                리뷰 남기기
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-800 mb-16 max-w-7xl mx-auto" />

      {/* 2. 하단 리뷰 섹션 (이제 상단 flex 밖이라 아래로 깔림) */}
      <section className="max-w-7xl mx-auto pt-4">
        <h2 className="text-3xl font-bold mb-10">관람평</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800 flex flex-col gap-4 hover:border-zinc-600 transition-all"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-zinc-300">작성자: {r.userId}</p>
                <p className="text-yellow-500 font-bold">
                  별점: {r.clickedStarNum}
                </p>
              </div>
              <p className="text-white text-lg leading-relaxed">{r.comment}</p>
              <div className="flex gap-4 justify-end mt-4">
                <button
                  onClick={() => deleteReview(i)}
                  className="text-sm text-zinc-500 hover:text-white"
                >
                  삭제
                </button>
                <button
                  onClick={() => editReview(i)}
                  className="text-sm text-zinc-500 hover:text-white"
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 모달 (전체 div 안쪽 맨 하단에 배치) */}
      {isModalOpen && (
        <ReviewModal
          reviewOpen={() => setIsModalOpen(false)}
          addReviewOpen={addReview}
          editReview={handleUpdate}
          selectedReview={selectedReview}
          userId={(() => {
            const userData = localStorage.getItem("user");
            if (!userData) return "익명";
            const parsed = JSON.parse(userData);
            const user = Array.isArray(parsed)
              ? parsed[parsed.length - 1]
              : parsed;
            return user?.userID || "익명";
          })()}
        />
      )}
    </div>
  );
}
export default MovieDetail;
