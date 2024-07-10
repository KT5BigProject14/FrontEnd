import PropTypes from "prop-types";
import "./FrameComponent1.css";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div className={`content-wrapper-wrapper ${className}`}>
      <div className="content-wrapper">
        <img className="div-relative-icon" alt="" src="/div-relative@2x.png" />
        <div className="beta-content-parent">
          <div className="beta-content">
            <div className="button-beta-btn">
              <div className="beta-button-icon-wrapper">
                <div className="beta-icons">
                  <img className="icon1" alt="" src="/icon-1.svg" />
                  <img className="icon2" alt="" src="/icon-2.svg" />
                </div>
              </div>
              <div className="is-currently-in-beta-wrapper">
                <div className="is-currently-in">is currently in beta</div>
              </div>
              <img className="icon3" alt="" src="/icon-3.svg" />
            </div>
          </div>
          <div className="ai-for-teams-building-parent">
            <h1 className="ai-for-teams">AI for teams building</h1>
            <div className="whats-next-wrapper">
              <h1 className="whats-next">what's next.</h1>
            </div>
          </div>
        </div>
        <div className="agent-building-content-wrapper">
          <div className="agent-building-content">
            <div className="workflow-description">
              <div className="scout-gives-you">
                Scout gives you the tools to build custom agents and
              </div>
              <div className="workflow-time">
                <div className="workflows-in-record">
                  workflows in record time.
                </div>
              </div>
            </div>
            <div className="link-btn-2-wrapper">
              <button className="link-btn-21">
                <div className="get-started">Get Started</div>
                <div className="icon-wrapper">
                  <img className="icon4" alt="" src="/icon-4.svg" />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden-icon">
          <div className="div-hidden2" />
          <img className="icon5" alt="" src="/icon-5.svg" />
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
