import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  removeFromFavorites,
} from "../../store/slices/favoriteSlice";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { POSTER_SM, PLACEHOLDER_POSTER } from "../../utils/constants";
import "./Favorites.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(fetchFavorites());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__empty">
          <FaHeart className="favorites-page__empty-icon" />
          <h2>Sign in to view your favorites</h2>
          <Link to="/login" className="favorites-page__cta">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="favorites-page">
      <div className="favorites-page__header page-enter">
        <h1>My Favorites</h1>
        <p>
          {items.length} {items.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {items.length === 0 ? (
        <div className="favorites-page__empty">
          <FaHeart className="favorites-page__empty-icon" />
          <h2>No favorites yet</h2>
          <p>Start adding movies to your favorites!</p>
          <Link to="/" className="favorites-page__cta">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="favorites-page__grid stagger-grid">
          {items.map((item) => (
            <div key={item._id} className="fav-card">
              <Link
                to={`/${item.mediaType === "tv" ? "tv" : "movie"}/${item.tmdbId}`}
                className="fav-card__link"
              >
                <img
                  src={
                    item.posterPath
                      ? `${POSTER_SM}${item.posterPath}`
                      : PLACEHOLDER_POSTER
                  }
                  alt={item.title}
                  loading="lazy"
                />
                <div className="fav-card__info">
                  <h3>{item.title}</h3>
                  <span>{item.releaseDate?.slice(0, 4) || "N/A"}</span>
                  {item.rating > 0 && (
                    <span className="fav-card__rating">
                      ★ {item.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </Link>
              <button
                className="fav-card__remove"
                onClick={() => dispatch(removeFromFavorites(item.tmdbId))}
                title="Remove from favorites"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
