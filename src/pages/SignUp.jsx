import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // 1. 유저 정보 가져오기 (중복 체크용)
      const res = await fetch("http://localhost:4000/users");
      const users = await res.json();

      const isDuplicate = users.some((user) => user.userId === id);
      if (isDuplicate) {
        alert("중복된 아이디입니다!");
        return;
      }

      // 2. 서버에 저장 (POST)
      const newUser = { userID: id, pw: pw };
      const postRes = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (postRes.ok) {
        alert(
          `${id}님, 회원가입이 완료되었습니다! 확인을 누르면 로그인 페이지로 이동합니다.`,
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("서버 통신 에러:", error);
      alert("서버랑 연결이 되지않습니다");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <div>
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
        <button type="button" onClick={handleSignUp}>
          가입하기{" "}
        </button>
      </div>

      {isModalOpen && (
        <Modal
          title="가입완료"
          contents={`${id}님 환영합니다.`}
          onConfirm={() => navigate("/login")}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
export default SignUp;
