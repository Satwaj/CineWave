import Logo from "../Logo/Logo";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  return (
    <div className="splash" onAnimationEnd={onFinish}>
      {/* Background particles */}
      <div className="splash__particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="splash__particle"
            style={{
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 1.5}s`,
              "--size": `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Film strip left */}
      <div className="splash__strip splash__strip--left" />
      {/* Film strip right */}
      <div className="splash__strip splash__strip--right" />

      {/* Center content */}
      <div className="splash__center">
        <div className="splash__logo-ring">
          <Logo size={80} className="splash__logo-svg" />
        </div>

        <div className="splash__text">
          <span className="splash__letter" style={{ "--i": 0 }}>
            C
          </span>
          <span className="splash__letter" style={{ "--i": 1 }}>
            i
          </span>
          <span className="splash__letter" style={{ "--i": 2 }}>
            n
          </span>
          <span className="splash__letter" style={{ "--i": 3 }}>
            e
          </span>
          <span
            className="splash__letter splash__letter--accent"
            style={{ "--i": 4 }}
          >
            W
          </span>
          <span
            className="splash__letter splash__letter--accent"
            style={{ "--i": 5 }}
          >
            a
          </span>
          <span
            className="splash__letter splash__letter--accent"
            style={{ "--i": 6 }}
          >
            v
          </span>
          <span
            className="splash__letter splash__letter--accent"
            style={{ "--i": 7 }}
          >
            e
          </span>
        </div>

        <div className="splash__tagline">Discover. Stream. Repeat.</div>

        {/* Wave line under text */}
        <svg className="splash__wave" viewBox="0 0 200 20" fill="none">
          <path
            d="M0 10 Q25 0, 50 10 T100 10 T150 10 T200 10"
            stroke="#f5c518"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SplashScreen;
