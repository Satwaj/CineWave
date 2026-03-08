import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrending,
  fetchPopular,
  fetchPopularTv,
  fetchMoviesByGenre,
} from "../../store/slices/movieSlice";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import MovieRow from "../../components/MovieRow/MovieRow";
import { SkeletonGrid } from "../../components/Loader/Loader";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { trending, popular, popularTv, genreMovies, loading } = useSelector(
    (state) => state.movies,
  );
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopular());
    dispatch(fetchPopularTv());
  }, [dispatch]);

  const handleGenreChange = (genreId) => {
    setActiveGenre(genreId);
    if (genreId !== 0) {
      dispatch(fetchMoviesByGenre({ genreId, page: 1 }));
    }
  };

  return (
    <div className="home">
      <HeroBanner movies={trending.results.slice(0, 5)} />

      <GenreFilter
        activeGenre={activeGenre}
        onGenreChange={handleGenreChange}
      />

      {activeGenre !== 0 && genreMovies.results.length > 0 && (
        <MovieRow
          title="Filtered Results"
          movies={genreMovies.results.slice(0, 12)}
        />
      )}

      {loading && !trending.results.length ? (
        <SkeletonGrid count={6} />
      ) : (
        <>
          <MovieRow
            title="Trending Movies"
            movies={trending.results.slice(0, 6)}
            seeAllLink="/movies"
          />
          <MovieRow
            title="Popular TV Shows"
            movies={popularTv.results.slice(0, 6)}
            mediaType="tv"
            seeAllLink="/tv-shows"
          />
          <MovieRow
            title="Popular Movies"
            movies={popular.results.slice(0, 6)}
            seeAllLink="/movies"
          />
        </>
      )}
    </div>
  );
};

export default Home;
