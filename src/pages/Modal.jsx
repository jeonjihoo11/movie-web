// Modal.jsx
import React from "react";

const Modal = ({ title, contents, onConfirm, onCancel }) => {
  return (
    /* [핵심] fixed inset-0가 있어야 페이지 하단이 아니라 '화면 전체'를 기준으로 움직여! */
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. 배경 (검은색 반투명) - 이걸 깔아야 뒤에 회원가입 창이 안 눌려 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* 2. 진짜 네모 창 (지후가 원하는 독자적인 창) */}
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center z-[1001]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 whitespace-pre-line">{contents}</p>
        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
        >
          로그인
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default Modal;
