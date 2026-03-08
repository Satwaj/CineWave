import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/favoriteSlice";
import { POSTER_SM, PLACEHOLDER_POSTER } from "../../utils/constants";
import "./MovieCard.css";

const MovieCard = ({ movie, mediaType }) => {
  const [imgError, setImgError] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { items: favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const title = movie.title || movie.name || "Untitled";
  const poster =
    movie.poster_path && !imgError
      ? `${POSTER_SM}${movie.poster_path}`
      : PLACEHOLDER_POSTER;
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const type = mediaType || movie.media_type || "movie";
  const isFav = favorites.some((f) => f.tmdbId === movie.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    if (isFav) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(
        addToFavorites({
          tmdbId: movie.id,
          title,
          posterPath: movie.poster_path,
          mediaType: type,
          rating: movie.vote_average,
          releaseDate: movie.release_date || movie.first_air_date,
        }),
      );
    }
  };

  return (
    <Link
      to={`/${type === "tv" ? "tv" : "movie"}/${movie.id}`}
      className="movie-card"
    >
      <div className="movie-card__poster">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="movie-card__overlay">
          <div className="movie-card__rating">
            <FaStar /> {rating}
          </div>
          {user && (
            <button
              className={`movie-card__fav ${isFav ? "movie-card__fav--active" : ""}`}
              onClick={handleFavorite}
            >
              {isFav ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{title}</h3>
        <span className="movie-card__year">{year || "N/A"}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
