import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import tmdbService from "../../services/tmdbService";
import Loader, { SkeletonGrid } from "../../components/Loader/Loader";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { PROFILE, PLACEHOLDER_POSTER } from "../../utils/constants";
import "./People.css";

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPeople = useCallback(async (pg) => {
    setLoading(true);
    try {
      const data = await tmdbService.getPopularPeople(pg);
      setPeople((prev) =>
        pg === 1 ? data.results : [...prev, ...data.results],
      );
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Failed to fetch people:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPeople(1);
  }, [fetchPeople]);

  const loadMore = useCallback(() => {
    if (page < totalPages) fetchPeople(page + 1);
  }, [page, totalPages, fetchPeople]);

  useInfiniteScroll(loadMore, page < totalPages, loading);

  return (
    <div className="people-page">
      <div className="people-page__header page-enter">
        <h1>People</h1>
        <p>Popular actors, directors, and creators</p>
      </div>

      {loading && !people.length ? (
        <SkeletonGrid count={12} />
      ) : (
        <div className="people-page__grid stagger-grid">
          {people.map((person) => (
            <Link
              key={person.id}
              to={`/person/${person.id}`}
              className="person-card"
            >
              <div className="person-card__img">
                <img
                  src={
                    person.profile_path
                      ? `${PROFILE}${person.profile_path}`
                      : PLACEHOLDER_POSTER
                  }
                  alt={person.name}
                  loading="lazy"
                />
              </div>
              <h3 className="person-card__name">{person.name}</h3>
              <p className="person-card__dept">{person.known_for_department}</p>
            </Link>
          ))}
        </div>
      )}

      {loading && people.length > 0 && <Loader />}
    </div>
  );
};

export default People;
