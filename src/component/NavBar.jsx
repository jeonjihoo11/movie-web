import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempText, setTempText] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setTempText(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${tempText}`);
  };
  useEffect(() => {
    const debounce = setTimeout(() => setSearchTerm(tempText), 3000);
    return () => clearTimeout(debounce);
  }, [tempText]);

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-black text-white sticky top-0 z-50 shadow-md">
      {" "}
      {/* 전체 감싸는 박스*/}
      {/* 왼쪽 그룹: 로고와 기본 메뉴*/}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 tracking-tighter"
        >
          CINEMA
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link to="/about " className="hover:text-gray-400 transition">
            About
          </Link>
        </div>
      </div>
      {/* 오른쪼 검색창과 유저메뉴 */}
      <div className="flex items-center gap-6">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            placeholder="영화 검색"
            value={tempText}
            onChange={handleUsernameChange}
            className="bg-zinc-800 text-white text-sm px-4 py-2 rounded-full border border-zinc-700 focus:outline-none focus:border-red-600 w-40 md:w-60 transition-all"
          />
          <button type="submit">검색</button>
        </form>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/singup" className="hover:text-gray-400">
            회원가입
          </Link>
          <Link to="/login" className="hover:text-gray-400">
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
