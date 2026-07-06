// Modal.jsx
import React from "react";

const Modal = ({ title, contents, onConfirm, onCancel }) => {
  return (
    
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      
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
