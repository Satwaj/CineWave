import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularTv } from "../../store/slices/movieSlice";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader, { SkeletonGrid } from "../../components/Loader/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./TvShows.css";

const TvShows = () => {
  const dispatch = useDispatch();
  const { popularTv, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!popularTv.results.length) {
      dispatch(fetchPopularTv(1));
    }
  }, [dispatch, popularTv.results.length]);

  const loadMore = useCallback(() => {
    if (popularTv.page < popularTv.totalPages) {
      dispatch(fetchPopularTv(popularTv.page + 1));
    }
  }, [dispatch, popularTv.page, popularTv.totalPages]);

  useInfiniteScroll(loadMore, popularTv.page < popularTv.totalPages, loading);

  return (
    <div className="tvshows-page">
      <div className="tvshows-page__header page-enter">
        <h1>TV Shows</h1>
        <p>Discover popular TV series from across the globe</p>
      </div>

      {loading && !popularTv.results.length ? (
        <SkeletonGrid count={12} />
      ) : (
        <div className="tvshows-page__grid stagger-grid">
          {popularTv.results.map((show) => (
            <MovieCard key={show.id} movie={show} mediaType="tv" />
          ))}
        </div>
      )}

      {loading && popularTv.results.length > 0 && <Loader />}
    </div>
  );
};

export default TvShows;
