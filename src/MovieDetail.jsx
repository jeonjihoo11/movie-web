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
  const addReview = (text, rating, userId) => {
    const newReview = {
      id: Date.now(),
      comment: text,
      rating: rating,
      userId: userId,
      data: new Date().toLocaleDateString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
  };
  //리뷰수정을 완료하는
  const handleUpdate = (newText) => {
    console.log("2. 부모가 받은 글자", newText);
    console.log("3.수정할 놈의 인덱스", selectedReview?.index);

    if (!selectedReview || selectedReview.index === undefined) return;

    const updatedReview = [...reviews];

    updatedReview[selectedReview.index] = {
      ...updatedReview[selectedReview.index],
      comment: newText,
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
    <div className="flex flex-col md:flex-row gap-10">
      {" "}
      {/* 전체를 감싸는부분*/}
      {/* 왼쪽 포스터*/}
      <img
        className="rounded-lg shadow-xl"
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={movie.title}
      />{" "}
      {/* 오른쪽 정보창*/}
      <div className=" flex flex-1 flex-col gap-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-gray-400">{movie.overview}</p>
        <p className="text-gray-400">{movie.vote_average?.toFixed(1)}</p>

        <div className="flex gap-10">
          {" "}
          {/* 버튼들*/} {/* 버튼 css*/}
          <button
            type="button"
            onClick={handleFavorite}
            className="flex-1 bg-red-600 py-3 rounded"
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
            className="flex-1 bg-gray-600 py-3 rounded"
          >
            리뷰 남기기
          </button>
        </div>

        <hr className="border-zinc-800 mb-10" />

        {/* 하단 리뷰 섹션*/}
        <section className="max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">관람평</h2>
          <div className="flex flex-col gap-4">
            {/* 리뷰리스트 렌더링 란 */}
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-zinc-400">작성자:{r.userId}</p>
                  <p className="text-yellow-500">별점:{r.score}</p>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  내용:{r.comment}
                </p>{" "}
                {/* 리뷰 내용*/}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    onClick={() => deleteReview(i)}
                    className="text-sm text-zinc-500 hover:text-white"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => editReview(i)}
                    className="text-sm text-zinc-500 hover:text-red-500"
                  >
                    수정
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* 모달 컴포넌트 모달이 오픈되면 리뷰모달이 실행되고 addreview가 실행된다 */}
      {isModalOpen && (
        <ReviewModal
          reviewOpen={() => setIsModalOpen(false)}
          addReviewOpen={addReview}
          editReview={handleUpdate}
          selectedReview={selectedReview}
          userId={
            JSON.parse(localStorage.getItem("user"))?.id ||
            JSON.parse(localStorage.getItem("user"))?.slice(-1)[0]?.id
          }
        />
      )}
    </div>
  );
}
export default MovieDetail;
