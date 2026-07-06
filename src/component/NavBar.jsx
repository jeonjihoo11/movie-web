import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";
import {BASE_URL , options} from "./API.js"

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempText, setTempText] = useState(""); //검색창에 쓰여지고 있는 
  const [suggestions, setSuggestions] = useState([]) //받아와진 연관검색어를 담는 usestate
  
  const navigate = useNavigate();



useEffect(() => {
  const handle = setTimeout(async () => {
    // 검색어가 비어있지 않을 때만 fetch를 날리도록 수정
    if (tempText.trim().length > 0) {
      try {
        const res = await fetch(`${BASE_URL}/search/movie?query=${tempText}&language=ko-KR`, options);
        const data = await res.json();
        // data.results가 있는지 확인하고 5개만 자르기
        setSuggestions(data.results ? data.results.slice(0, 5) : []);
      } catch (err) {
        console.error("검색 실패:", err);
      }
    } else {
      // 검색어가 없으면 리스트를 즉시 비우기
      setSuggestions([]);
    }
  }, 500);

  return () => clearTimeout(handle);
}, [tempText]);

// 연관검색어를 받아오는 useeffect


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

          
          {/* 연관검색어 리스트 */}
{suggestions.length > 0 && (
  <ul className="absolute top-full left-0 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 p-2">
    {suggestions.map((movie) => (
      <li
        key={movie.id}
        className="px-4 py-2 hover:bg-zinc-700 cursor-pointer text-sm text-white"
        onClick={() => {
          navigate(`/details/${movie.id}`); // 클릭 시 이동
          setSuggestions([]); // 리스트 닫기
        }}
      >
        {movie.title}
      </li>
    ))}
  </ul>
)}




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
