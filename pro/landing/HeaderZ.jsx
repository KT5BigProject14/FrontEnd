import PropTypes from "prop-types";
import "./HeaderZ.css";

const HeaderZ = ({ className = "" }) => {
  return (
    <header className={`header-z-20 ${className}`}>
      <div className="header-icon-parent">
        <div className="header-icon">
          <img className="icon" alt="" src="/icon.svg" />
        </div>
        <div className="link-inline-block">
          <a className="features">Features</a>
        </div>
        <div className="link-inline-block1">
          <a className="pricing">Pricing</a>
        </div>
        <div className="link-inline-block2">
          <a className="docs">Docs</a>
        </div>
        <div className="link-inline-block3">
          <a className="blog">Blog</a>
        </div>
      </div>
      <div className="link-btn-1-parent">
        <div className="link-btn-1">
          <a className="login">Login</a>
        </div>
        <button className="link-btn-2">
          <a className="sign-up">Sign Up</a>
        </button>
      </div>
    </header>
  );
};

HeaderZ.propTypes = {
  className: PropTypes.string,
};

export default HeaderZ;
