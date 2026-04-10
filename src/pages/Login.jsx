import { useState } from "react";

function LogIn() {
  const [logid, setLogId] = useState("");
  const [logpw, setLogPw] = useState("");

  const hadleLoginUp = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users");
    const users = await res.json();

    const user = users.find((u) => u.userID === logid && u.pw === logpw);

    if (user) {
      alert("로그인 성공");
    } else {
      alert("아이디나 비번이 틀렸습니다");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        value={logid}
        placeholder="아이디"
        onChange={(e) => setLogId(e.target.value)}
      />
      <input
        type="text"
        value={logpw}
        placeholder="비밀번호"
        onChange={(e) => setLogPw(e.target.value)}
      />
      <button type="button" onClick={hadleLoginUp}>
        로그인
      </button>
    </div>
  );
}
export default LogIn;
