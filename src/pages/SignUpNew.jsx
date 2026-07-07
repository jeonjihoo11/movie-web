import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import {auth, googleProvider} from "../Firebase.js"
import { signInWithPopup } from "firebase/auth";
function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();


  const handleGoogleSignUp = async () => {
    try {
      // 1. 구글 로그인 진행 (인증)
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. [체크] 이미 가입된 유저인가?
      const res = await fetch("http://localhost:4000/users");
      const users = await res.json();
      const isAlreadySignedUp = users.some((u) => u.userID === user.email);
alert(`${user.displayName}님, 가입을 축하합니다!`);
        navigate("/");
      // 3. [분기처리] 
      if (isAlreadySignedUp) {
        // 이미 있으면 그냥 로그인 성공 처리
        alert(`${user.displayName}님, 다시 오신 걸 환영합니다!`);
        navigate("/");
      } else {
        // 처음이면 DB에 저장하고 로그인 성공 처리
        await saveUserToDB(user.email, "social_login");
        alert(`${user.displayName}님, 가입을 축하합니다!`);
        navigate("/");
      }
    } catch (error) {
      console.log("에러 발생", error);
    }
  };

  const handleSignUp = async (e) => {
    console.log("버튼 클릭됨")
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
    <div className=" min-h-screen bg-black flex flex-col justify-center items-center px-4 font-sans text-center ">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">회원가입</h2>
        <p className="text-zinc-400">회원가입 해주세요</p>
      </div>
      <div className="w-full max-w-md bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 shadow-2xl">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-semibold texy-zinc-300 ml-1">
              아이디
            </label>
            <input
              className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-zinc-500"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-left">
            <input
              className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-zinc-500"
              type="text"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-zinc-200 transition-colors active:scale-[0.98]"
            type="button"
            onClick={handleSignUp}
          >
            가입하기{" "}
          </button>
          <button type="button"
          onClick={ handleGoogleSignUp}
          >구글로 회원가입하기</button>
        </form>
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
