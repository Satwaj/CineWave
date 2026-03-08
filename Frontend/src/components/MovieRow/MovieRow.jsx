import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

const MovieRow = ({ title, movies = [], seeAllLink, mediaType }) => {
  if (!movies.length) return null;

  return (
    <section className="movie-row">
      <div className="movie-row__header slide-up">
        <h2 className="movie-row__title">{title}</h2>
        {seeAllLink && (
          <Link to={seeAllLink} className="movie-row__see-all">
            See All
          </Link>
        )}
      </div>
      <div className="movie-row__grid stagger-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
