import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import Logo from "../Logo/Logo";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          <Logo size={28} className="footer__logo-icon" />
          Cine<span>Wave</span>
        </Link>
        <p className="footer__desc">
          Your cinematic universe — explore trending movies, binge-worthy TV
          shows, and the people behind them. Powered by TMDB.
        </p>
      </div>
      <div className="footer__links">
        <h4>Explore</h4>
        <Link to="/">Trending</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tv-shows">TV Shows</Link>
        <Link to="/people">People</Link>
      </div>
      <div className="footer__links">
        <h4>Account</h4>
        <Link to="/favorites">Favorites</Link>
        <Link to="/watch-history">Watch History</Link>
        <Link to="/login">Sign In</Link>
      </div>
      <div className="footer__links">
        <h4>Connect</h4>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
      </div>
    </div>
    <div className="footer__bottom">
      <p>
        Made with <FaHeart className="footer__heart" /> by Satwaj Bachhav &copy;{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
