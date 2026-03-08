import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { logoutUser } from "../../store/slices/authSlice";
import Logo from "../Logo/Logo";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
      setShowSearch(false);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Trending" },
    { path: "/movies", label: "Movies" },
    { path: "/tv-shows", label: "TV Shows" },
    { path: "/people", label: "People" },
    { path: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <Logo size={32} className="navbar__logo-icon" />
          Cine<span>Wave</span>
        </Link>

        <div
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}
        </div>

        <div className="navbar__actions">
          <form
            className={`navbar__search ${showSearch ? "navbar__search--open" : ""}`}
            onSubmit={handleSearch}
          >
            <FiSearch
              className="navbar__search-icon"
              onClick={() => setShowSearch(!showSearch)}
            />
            <input
              type="text"
              placeholder="Search movies, shows..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="navbar__search-input"
            />
          </form>

          {user ? (
            <div className="navbar__user">
              <div className="navbar__avatar" title={user.name}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-inner">
                  <Link to="/watch-history" className="navbar__dropdown-item">
                    Watch History
                  </Link>
                  <Link to="/favorites" className="navbar__dropdown-item">
                    My Favorites
                  </Link>
                  {user.role === "admin" && (
                    <Link to="/admin" className="navbar__dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar__login-btn">
              Sign In
            </Link>
          )}

          <button
            className="navbar__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
