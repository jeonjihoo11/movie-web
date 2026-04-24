import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { BASE_URL, options } from "./component/API";
import ReviewModal from "./ReviewModal";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); //모달
  const [isEditMode, setIsEditMode] = useState(false); //수정중인지
  const [selectedReview, setSelectedReview] = useState([]); //어떤 리뷰를 고칠건지

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?language=ko-KR`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("영화데이터", data);
        setMovie(data);
      });
  }, [id]);

  // MovieDetail 컴포넌트 제일 윗부분
  const [reviews, setReviews] = useState(() => {
    // 페이지가 처음 태어날 때 딱 한 번만 실행되는 비밀 코드야!
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  // 💡 이렇게 하면 이제 useEffect에서 꺼내오는 코드는 아예 지워도 돼!

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
  const addReview = (newReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    //  로컬스토리지에는 '문자열'만 들어가서 JSON.stringify필수
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const deleteReview = (targetIndex) => {
    const newReviews = reviews.filter((_, i) => i !== targetIndex);
    setReviews(newReviews);
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
    <div className="flex flex-col md:flex-row gap-10">
      <img
        className="rounded-lg shadow-xl"
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={movie.title}
      />
      <div className=" flex flex-1 flex-col gap-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-gray-400">{movie.overview}</p>
        <p className="text-gray-400">{movie.vote_average?.toFixed(1)}</p>

        <div className="flex gap-10">
          {" "}
          {/* 버튼 css*/}
          <button
            type="button"
            onClick={handleFavorite}
            className="flex-1 bg-red-600 py-3 rounded"
          >
            찜하기
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-gray-600 py-3 rounded"
          >
            리뷰 남기기
          </button>
        </div>
        {/* 모달 컴포넌트 모달이 오픈되면 리뷰모달이 실행되고 addreview가 실행된다 */}
        {isModalOpen && (
          <ReviewModal
            reviewOpen={() => setIsModalOpen(false)}
            addReviewOpen={addReview}
            editReview={editReview}
            selectedReview={selectedReview}
            userId={
              JSON.parse(localStorage.getItem("user"))?.id ||
              JSON.parse(localStorage.getItem("user"))?.slice(-1)[0]?.id
            }
          />
        )}

        {/* 리뷰리스트 렌더링 란 */}
        {reviews.map((r, i) => (
          <div key={i}>
            <p>작성자:{r.userId}</p>
            <p>내용:{r.comment}</p>
            <p>별점:{r.score}</p>
            <button onClick={() => deleteReview(i)}>삭제</button>
            <button onClick={() => editReview(i)}>수정</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MovieDetail;
