import { FiX } from "react-icons/fi";
import "./TrailerModal.css";

const TrailerModal = ({ videoKey, onClose }) => {
  if (!videoKey) return null;

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div
        className="trailer-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="trailer-modal__close" onClick={onClose}>
          <FiX />
        </button>
        <div className="trailer-modal__player">
          <iframe
            src={`https://www.youtube.com/embed/${encodeURIComponent(videoKey)}?autoplay=1&rel=0`}
            title="Trailer"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
