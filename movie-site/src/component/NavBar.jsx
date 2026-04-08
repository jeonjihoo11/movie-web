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
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="영화 검색"
          value={tempText}
          onChange={handleUsernameChange}
        />
        <button type="submit">검색</button>
      </form>
    </nav>
  );
}
export default NavBar;
