import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  clearDetail,
} from "../../store/slices/movieSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/slices/favoriteSlice";
import { FiPlay, FiClock, FiCalendar, FiStar } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import Loader from "../../components/Loader/Loader";
import api from "../../services/api";
import {
  BACKDROP,
  POSTER_MD,
  PLACEHOLDER_POSTER,
  PLACEHOLDER_BACKDROP,
} from "../../utils/constants";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id, type = "movie" } = useParams();
  const dispatch = useDispatch();
  const { detail, videos, detailLoading } = useSelector(
    (state) => state.movies,
  );
  const { user } = useSelector((state) => state.auth);
  const { items: favorites } = useSelector((state) => state.favorites);
  const [showTrailer, setShowTrailer] = useState(false);

  const mediaType = type === "tv" ? "tv" : "movie";
  const isFav = favorites.some((f) => f.tmdbId === Number(id));

  useEffect(() => {
    dispatch(fetchMovieDetail({ id, type: mediaType }));
    dispatch(fetchMovieVideos({ id, type: mediaType }));

    // Add to watch history
    if (user) {
      api
        .post("/watch-history", {
          tmdbId: Number(id),
          title: "",
          posterPath: "",
          mediaType,
          rating: 0,
        })
        .catch(() => {});
    }

    return () => dispatch(clearDetail());
  }, [dispatch, id, mediaType, user]);

  // Update watch history with full details once loaded
  useEffect(() => {
    if (detail && user) {
      api
        .post("/watch-history", {
          tmdbId: detail.id,
          title: detail.title || detail.name,
          posterPath: detail.poster_path || "",
          mediaType,
          rating: detail.vote_average || 0,
        })
        .catch(() => {});
    }
  }, [detail, user, mediaType]);

  if (detailLoading || !detail) return <Loader />;

  const title = detail.title || detail.name || "Untitled";
  const backdrop = detail.backdrop_path
    ? `${BACKDROP}${detail.backdrop_path}`
    : PLACEHOLDER_BACKDROP;
  const poster = detail.poster_path
    ? `${POSTER_MD}${detail.poster_path}`
    : PLACEHOLDER_POSTER;
  const rating = detail.vote_average?.toFixed(1) || "N/A";
  const year = (detail.release_date || detail.first_air_date || "").slice(0, 4);
  const runtime = detail.runtime
    ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`
    : detail.number_of_seasons
      ? `${detail.number_of_seasons} Seasons`
      : "";
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos[0];

  const handleFavorite = () => {
    if (!user) return;
    if (isFav) {
      dispatch(removeFromFavorites(detail.id));
    } else {
      dispatch(
        addToFavorites({
          tmdbId: detail.id,
          title,
          posterPath: detail.poster_path,
          mediaType,
          rating: detail.vote_average,
          releaseDate: detail.release_date || detail.first_air_date,
        }),
      );
    }
  };

  return (
    <div className="detail">
      <div
        className="detail__backdrop"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="detail__backdrop-overlay" />
      </div>

      <div className="detail__content page-enter">
        <div className="detail__poster">
          <img src={poster} alt={title} />
        </div>

        <div className="detail__info">
          <h1 className="detail__title">{title}</h1>

          <div className="detail__meta">
            <span className="detail__rating">
              <FiStar /> {rating}
            </span>
            {year && (
              <span>
                <FiCalendar /> {year}
              </span>
            )}
            {runtime && (
              <span>
                <FiClock /> {runtime}
              </span>
            )}
          </div>

          <div className="detail__genres">
            {detail.genres?.map((g) => (
              <span key={g.id} className="detail__genre-tag">
                {g.name}
              </span>
            ))}
          </div>

          <p className="detail__overview">
            {detail.overview || "Description not available"}
          </p>

          <div className="detail__actions">
            {trailer ? (
              <button
                className="detail__btn detail__btn--primary"
                onClick={() => setShowTrailer(true)}
              >
                <FiPlay /> Watch Trailer
              </button>
            ) : (
              <div className="detail__no-trailer">
                Trailer for this movie is currently unavailable.
              </div>
            )}
            {user && (
              <button
                className={`detail__btn detail__btn--secondary ${isFav ? "detail__btn--fav" : ""}`}
                onClick={handleFavorite}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
                {isFav ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
          </div>

          {detail.production_companies?.length > 0 && (
            <div className="detail__companies">
              <span className="detail__label">Production:</span>
              {detail.production_companies.map((c) => c.name).join(", ")}
            </div>
          )}
        </div>
      </div>

      {showTrailer && trailer && (
        <TrailerModal
          videoKey={trailer.key}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
};

export default MovieDetail;
