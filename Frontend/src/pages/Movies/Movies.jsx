import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopular } from "../../store/slices/movieSlice";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader, { SkeletonGrid } from "../../components/Loader/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import "./Movies.css";

const Movies = () => {
  const dispatch = useDispatch();
  const { popular, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!popular.results.length) {
      dispatch(fetchPopular(1));
    }
  }, [dispatch, popular.results.length]);

  const loadMore = useCallback(() => {
    if (popular.page < popular.totalPages) {
      dispatch(fetchPopular(popular.page + 1));
    }
  }, [dispatch, popular.page, popular.totalPages]);

  useInfiniteScroll(loadMore, popular.page < popular.totalPages, loading);

  return (
    <div className="movies-page">
      <div className="movies-page__header page-enter">
        <h1>Movies</h1>
        <p>Explore popular movies from around the world</p>
      </div>

      {loading && !popular.results.length ? (
        <SkeletonGrid count={12} />
      ) : (
        <div className="movies-page__grid stagger-grid">
          {popular.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} mediaType="movie" />
          ))}
        </div>
      )}

      {loading && popular.results.length > 0 && <Loader />}
    </div>
  );
};

export default Movies;
