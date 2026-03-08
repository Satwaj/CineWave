import { GENRES } from "../../utils/constants";
import "./GenreFilter.css";

const GenreFilter = ({ activeGenre, onGenreChange }) => {
  return (
    <div className="genre-filter">
      <div className="genre-filter__container">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            className={`genre-filter__btn ${activeGenre === genre.id ? "genre-filter__btn--active" : ""}`}
            onClick={() => onGenreChange(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
