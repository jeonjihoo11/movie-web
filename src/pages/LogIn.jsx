import { useState } from "react";

function LogIn() {
  const [logid, setLogId] = useState("");

  const [logpw, setLogPw] = useState("");

  const hadleLoginUp = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/users");

    const users = await res.json();

    const user = users.find((u) => u.userID === logid && u.pw === logpw);

    localStorage.setItem("user", JSON.stringify(users));

    if (user) {
      alert("로그인 성공");
    } else {
      alert("아이디나 비번이 틀렸습니다");
    }
  };
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 font-sans text-center">
      {/* 제목 부분 */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">로그인</h2>
        <p className="text-zinc-400">CINEMA에 오신 것을 환영합니다</p>
      </div>

      {/* 카드 박스 디자인 - bg-zinc-900/50 으로 수정! */}
      <div className="w-full max-w-md bg-zinc-900/50 p-10 rounded-3xl border border-zinc-800 shadow-2xl">
        <form className="flex flex-col gap-6" onSubmit={hadleLoginUp}>
          {/* 아이디 입력 구역 */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-semibold text-zinc-300 ml-1">
              아이디
            </label>
            <input
              className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-zinc-500"
              type="text"
              value={logid}
              placeholder="아이디"
              onChange={(e) => setLogId(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 구역 */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-semibold text-zinc-300 ml-1">
              비밀번호
            </label>
            <input
              type="text"
              value={logpw}
              placeholder="비밀번호"
              onChange={(e) => setLogPw(e.target.value)}
              className="bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-zinc-500"
            />
          </div>

          {/* 버튼 오타 수정 완료! */}
          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-zinc-200 transition-colors active:scale-[0.98]"
          >
            로그인
          </button>
        </form>

        {/* 하단 회원가입 유도 */}
        <div className="mt-8 text-sm text-zinc-500">
          계정이 없으신가요?{" "}
          <span className="text-white font-bold cursor-pointer hover:underline">
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
