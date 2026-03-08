import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchAll, clearSearch } from "../../store/slices/searchSlice";
import useDebounce from "../../hooks/useDebounce";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import { PROFILE, PLACEHOLDER_POSTER } from "../../utils/constants";
import { Link } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const dispatch = useDispatch();
  const { results, page, totalPages, loading } = useSelector(
    (state) => state.search,
  );
  const debouncedQuery = useDebounce(queryParam, 400);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchAll({ query: debouncedQuery, page: 1 }));
    } else {
      dispatch(clearSearch());
    }
  }, [debouncedQuery, dispatch]);

  const loadMore = useCallback(() => {
    if (page < totalPages && debouncedQuery) {
      dispatch(searchAll({ query: debouncedQuery, page: page + 1 }));
    }
  }, [dispatch, page, totalPages, debouncedQuery]);

  useInfiniteScroll(loadMore, page < totalPages, loading);

  const handleInputChange = (e) => {
    setSearchParams({ q: e.target.value });
  };

  return (
    <div className="search-page">
      <div className="search-page__header page-enter">
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search movies, TV shows, people..."
          value={queryParam}
          onChange={handleInputChange}
          className="search-page__input"
          autoFocus
        />
      </div>

      {queryParam && (
        <p className="search-page__info">
          {loading
            ? "Searching..."
            : `Found ${results.length} results for "${queryParam}"`}
        </p>
      )}

      <div className="search-page__grid stagger-grid">
        {results.map((item) => {
          if (item.media_type === "person") {
            return (
              <Link
                key={item.id}
                to={`/person/${item.id}`}
                className="person-result"
              >
                <img
                  src={
                    item.profile_path
                      ? `${PROFILE}${item.profile_path}`
                      : PLACEHOLDER_POSTER
                  }
                  alt={item.name}
                  loading="lazy"
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.known_for_department}</p>
                </div>
              </Link>
            );
          }
          return <MovieCard key={item.id} movie={item} />;
        })}
      </div>

      {loading && <Loader />}

      {!loading && queryParam && !results.length && (
        <div className="search-page__empty">
          <p>No results found for "{queryParam}"</p>
        </div>
      )}
    </div>
  );
};

export default Search;
