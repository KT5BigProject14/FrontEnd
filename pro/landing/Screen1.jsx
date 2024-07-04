import HeaderZ from "../components/HeaderZ";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import TestimonialContent from "../components/TestimonialContent";
import "./Screen1.css";

const Screen1 = () => {
  return (
    <div className="screen">
      <main className="div-bg-gradient">
        <section className="container">
          <HeaderZ />
          <FrameComponent1 />
        </section>
        <section className="div-lgvertical-line-l-parent">
          <div className="div-lgvertical-line-l" />
          <div className="div-lgvertical-line-r" />
          <div className="wrapper-section-relative">
            <img
              className="section-relative-icon"
              alt=""
              src="/section-relative@2x.png"
            />
          </div>
          <div className="div-full-width-line" />
          <div className="div-full-width-line1" />
          <div className="div-full-width-line2" />
          <div className="hero-background">
            <div className="wrapper-div-bg-hero">
              <img className="div-bg-hero-icon" alt="" src="/div-bghero.svg" />
            </div>
            <div className="div-hidden" />
          </div>
          <img
            className="div-col-start-1-icon"
            alt=""
            src="/div-colstart1@2x.png"
          />
          <div className="div-full-width-line3" />
          <div className="div-full-width-line4" />
          <div className="div-full-width-line5" />
          <div className="div-full-width-line6" />
          <img
            className="image-bg-pricing-stars-icon"
            alt=""
            src="/image-bgpricingstars.svg"
          />
          <div className="wrapper-image-hidden">
            <img className="image-hidden-icon" alt="" src="/image-hidden.svg" />
          </div>
          <div className="div-full-width-line7" />
          <div className="div-hidden1" />
        </section>
        <FrameComponent />
        <section className="testimonial-content-wrapper">
          <TestimonialContent />
        </section>
      </main>
    </div>
  );
};

export default Screen1;
