import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    // 기존에 있는 유저정보 가져오기
    const isDuplicate = existingUsers.some((user) => user.id === id);
    if (isDuplicate) {
      alert("중복된 아이디입니다");
      return;
    }

    const newUser = { id, pw }; // 실시간으로 쌓인 데이터
    const updatedUsers = [...existingUsers, newUser]; //기존데이터에 실시간으로쌓인 새로운 유저 데이터 추가한 배열

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button>가입하기 </button>
      </form>

      {isModalOpen && (
        <Modal
          title="가입완료"
          contents={`${id}님 환영합니다. 로그인 페이지로 이동하겠습니다.`}
          onConfirm={() => navigate("/login")}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
export default SignUp;
