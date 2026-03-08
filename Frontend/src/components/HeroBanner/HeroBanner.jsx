import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import {
  BACKDROP,
  POSTER_LG,
  PLACEHOLDER_BACKDROP,
} from "../../utils/constants";
import "./HeroBanner.css";

const HeroBanner = ({ movies = [] }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) return null;

  const movie = movies[current];
  const bg = movie.backdrop_path
    ? `${BACKDROP}${movie.backdrop_path}`
    : PLACEHOLDER_BACKDROP;
  const title = movie.title || movie.name || "Untitled";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const genres = movie.genre_ids || [];
  const mediaType = movie.media_type || "movie";

  const genreMap = {
    28: "Action",
    12: "Adventure",
    878: "Sci-Fi",
    18: "Drama",
    35: "Comedy",
    27: "Horror",
    16: "Animation",
    80: "Crime",
    10749: "Romance",
    53: "Thriller",
    14: "Fantasy",
    9648: "Mystery",
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <span className="hero__badge">TRENDING NOW</span>
        <h1 className="hero__title">{title}</h1>
        <div className="hero__meta">
          <span className="hero__rating">{rating} / 10</span>
          {genres.slice(0, 3).map((g) => (
            <span key={g} className="hero__genre">
              {genreMap[g] || "Genre"}
            </span>
          ))}
          {year && <span className="hero__genre">{year}</span>}
        </div>
        <p className="hero__overview">
          {movie.overview?.slice(0, 200) || "Description not available"}
          {movie.overview?.length > 200 ? "..." : ""}
        </p>
        <div className="hero__actions">
          <Link
            to={`/${mediaType === "tv" ? "tv" : "movie"}/${movie.id}`}
            className="hero__btn hero__btn--primary"
          >
            <FiPlay /> Watch Trailer
          </Link>
          <Link
            to={`/${mediaType === "tv" ? "tv" : "movie"}/${movie.id}`}
            className="hero__btn hero__btn--secondary"
          >
            <FaHeart /> Add to Favorites
          </Link>
        </div>
        <div className="hero__dots">
          {movies.map((_, idx) => (
            <button
              key={idx}
              className={`hero__dot ${idx === current ? "hero__dot--active" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
