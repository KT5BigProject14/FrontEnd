import PropTypes from "prop-types";
import "./FrameComponent.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <section className={`div-col-span-12-parent ${className}`}>
      <div className="div-col-span-12">
        <img
          className="image-logo-cloud-stars-icon"
          alt=""
          src="/image-logocloudstars.svg"
        />
        <div className="div-full-width-line8" />
        <div className="link-group-parent">
          <img
            className="link-group-icon"
            loading="lazy"
            alt=""
            src="/link-group@2x.png"
          />
          <img className="link-group-icon1" alt="" src="/link-group-1@2x.png" />
          <img className="link-group-icon2" alt="" src="/link-group-2@2x.png" />
          <img className="link-group-icon3" alt="" src="/link-group-3.svg" />
        </div>
        <div className="div-full-width-line9" />
      </div>
      <div className="client-name-container-wrapper">
        <div className="client-name-container">
          <h1 className="used-by-teams">{`Used by teams at Statsig, Deno, `}</h1>
          <div className="more-clients">
            <h1 className="dagster-evidence-and">
              Dagster, Evidence and more.
            </h1>
          </div>
        </div>
      </div>
      <div className="social-links-wrapper">
        <div className="social-links">
          <img className="link-group-icon4" alt="" src="/link-group-4@2x.png" />
          <img className="link-group-icon5" alt="" src="/link-group-5@2x.png" />
          <img className="link-group-icon6" alt="" src="/link-group-6@2x.png" />
          <img className="link-group-icon7" alt="" src="/link-group-7@2x.png" />
        </div>
      </div>
      <div className="div-copilot">
        <img
          className="div-fab-container-icon"
          loading="lazy"
          alt=""
          src="/div-fabcontainer@2x.png"
        />
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
