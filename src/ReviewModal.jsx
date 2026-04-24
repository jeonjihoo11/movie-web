import React, { useState, useEffect } from "react";

function ReviewModal({
  reviewOpen,
  addReviewOpen,
  editReview,
  userId,
  selectedReview,
}) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  // 모달이 열릴 때: 수정 모드면 기존 글자를 채우고, 아니면 비움
  useEffect(() => {
    if (selectedReview) {
      setText(selectedReview.content);
    } else {
      setText("");
    }
  }, [selectedReview]);

  const handleSubmit = () => {
    if (text.trim() === "") return;

    if (selectedReview) {
      // 수정 모드일 때
      editReview(text);
    } else {
      // 추가 모드일 때
      addReviewOpen(text, rating, userId);
    }

    reviewOpen(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          {selectedReview ? "리뷰 수정하기" : "리뷰 작성하기"}
        </h2>
        <textarea
          className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="리뷰를 입력해주세요..."
        />
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={reviewOpen}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            {selectedReview ? "수정 완료" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
