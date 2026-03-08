import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiClock, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import Loader from "../../components/Loader/Loader";
import { POSTER_SM, PLACEHOLDER_POSTER } from "../../utils/constants";
import "./WatchHistory.css";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      api
        .get("/watch-history")
        .then((res) => setHistory(res.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const clearAll = async () => {
    await api.delete("/watch-history");
    setHistory([]);
  };

  if (!user) {
    return (
      <div className="history-page">
        <div className="history-page__empty">
          <FiClock className="history-page__empty-icon" />
          <h2>Sign in to view your watch history</h2>
          <Link to="/login" className="history-page__cta">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="history-page">
      <div className="history-page__header page-enter">
        <div>
          <h1>Watch History</h1>
          <p>{history.length} recently watched</p>
        </div>
        {history.length > 0 && (
          <button className="history-page__clear" onClick={clearAll}>
            <FiTrash2 /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-page__empty">
          <FiClock className="history-page__empty-icon" />
          <h2>No watch history yet</h2>
          <p>Movies and shows you visit will appear here</p>
          <Link to="/" className="history-page__cta">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="history-page__list stagger-grid">
          {history.map((item) => (
            <Link
              key={item._id}
              to={`/${item.mediaType === "tv" ? "tv" : "movie"}/${item.tmdbId}`}
              className="history-card"
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
              <div className="history-card__info">
                <h3>{item.title || "Untitled"}</h3>
                <span>{new Date(item.watchedAt).toLocaleDateString()}</span>
                {item.rating > 0 && (
                  <span className="history-card__rating">
                    ★ {item.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
