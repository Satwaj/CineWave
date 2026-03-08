import "./Loader.css";

const Loader = () => (
  <div className="loader">
    <div className="loader__cinema">
      <div className="loader__reel">
        <div className="loader__reel-inner" />
      </div>
      <div className="loader__wave">
        <span style={{ "--i": 0 }} />
        <span style={{ "--i": 1 }} />
        <span style={{ "--i": 2 }} />
        <span style={{ "--i": 3 }} />
        <span style={{ "--i": 4 }} />
      </div>
      <p className="loader__text">Loading</p>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__poster skeleton-pulse" />
    <div className="skeleton-card__title skeleton-pulse" />
    <div className="skeleton-card__year skeleton-pulse" />
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Loader;
