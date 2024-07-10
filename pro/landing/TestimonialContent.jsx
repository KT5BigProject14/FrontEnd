import PropTypes from "prop-types";
import "./TestimonialContent.css";

const TestimonialContent = ({ className = "" }) => {
  return (
    <div className={`testimonial-content ${className}`}>
      <div className="testimonial-layout">
        <div className="div-hidden3">
          <div className="div-shrink-parent">
            <div className="div-shrink" />
            <div className="div-shrink1" />
          </div>
        </div>
        <div className="div-flex">
          <div className="div-logo-parent">
            <img className="div-logo-icon" alt="" src="/div-logo@2x.png" />
            <img className="div-logo-icon1" alt="" src="/div-logo-1@2x.png" />
          </div>
          <img className="div-logo-icon2" alt="" src="/div-logo-2@2x.png" />
        </div>
        <div className="div-bg-stars">
          <img
            className="background-images-icon"
            alt=""
            src="/background-images@2x.png"
          />
          <div className="testimonial-statements-parent">
            <div className="testimonial-statements">
              <h1 className="scout-is-an">
                "Scout is an indispensable tool for
              </h1>
            </div>
            <h1 className="our-engineering-ds">
              our Engineering, DS and Sales teams
            </h1>
            <div className="testimonial-statements1">
              <h1 className="to-engage-with">
                to engage with our customers. We
              </h1>
            </div>
            <div className="testimonial-statements2">
              <h1 className="rely-on-scout">
                rely on Scout daily, making it an
              </h1>
            </div>
            <div className="testimonial-statements3">
              <h1 className="integral-part-of">
                integral part of our operations."
              </h1>
            </div>
          </div>
          <div className="author-content-wrapper">
            <div className="author-content">
              <div className="author-image-wrapper">
                <img
                  className="div-rounded-full-icon"
                  loading="lazy"
                  alt=""
                  src="/div-roundedfull@2x.png"
                />
              </div>
              <div className="author-name">
                <div className="author-name-wrapper">
                  <div className="vijaye-raji">Vijaye Raji</div>
                </div>
                <div className="ceo-of-statsig">CEO of Statsig</div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-flex1">
          <div className="div-logo-group">
            <img className="div-logo-icon3" alt="" src="/div-logo-3@2x.png" />
            <img className="div-logo-icon4" alt="" src="/div-logo-4@2x.png" />
          </div>
          <img className="div-logo-icon5" alt="" src="/div-logo-5@2x.png" />
        </div>
        <div className="div-hidden4">
          <div className="div-shrink-group">
            <div className="div-shrink2" />
            <div className="div-shrink3" />
          </div>
        </div>
      </div>
      <div className="pricing-content-wrapper">
        <div className="pricing-content">
          <div className="pricing-intro">
            <div className="plan-intro">
              <div className="plan-heading">
                <h1 className="a-plan-for">A plan for every need.</h1>
              </div>
              <div className="whether-you-are">
                Whether you are just starting or require massive scale, we have
                a solution.
              </div>
            </div>
          </div>
          <div className="hobby-plan">
            <div className="hobby-plan-content">
              <div className="section-hobby">
                <div className="div-plan-name-hobby-parent">
                  <div className="div-plan-name-hobby">
                    <img
                      className="image-icon"
                      loading="lazy"
                      alt=""
                      src="/image.svg"
                    />
                    <div className="hobby-wrapper">
                      <div className="hobby">Hobby</div>
                    </div>
                  </div>
                  <div className="hobby-description">
                    <div className="hobby-price">$0</div>
                    <div className="paragraph-mt-2">
                      <div className="great-for-personal">
                        Great for personal use or
                      </div>
                      <div className="a-first-step">
                        a first step to explore
                      </div>
                      <div className="the-scout-platform">
                        the Scout platform.
                      </div>
                    </div>
                  </div>
                </div>
                <button className="link-sign-up">
                  <div className="sign-up1">Sign Up</div>
                </button>
                <div className="hobby-features">
                  <div className="hobby-feature-list">
                    <div className="hobby-feature-icons">
                      <img className="icon6" alt="" src="/icon-6.svg" />
                    </div>
                    <div className="hobby-feature-labels">
                      <div className="interactions-gpt-35">{`100 Interactions (GPT-3.5 `}</div>
                      <div className="only">Only)</div>
                    </div>
                  </div>
                  <div className="hobby-feature-list1">
                    <img className="icon7" alt="" src="/icon-6.svg" />
                    <div className="deploy-1-app-wrapper">
                      <div className="deploy-1-app">Deploy 1 App</div>
                    </div>
                  </div>
                  <div className="hobby-feature-list2">
                    <img className="icon8" alt="" src="/icon-6.svg" />
                    <div className="connect-1-collection-wrapper">
                      <div className="connect-1-collection">
                        Connect 1 Collection
                      </div>
                    </div>
                  </div>
                  <div className="hobby-feature-list3">
                    <img className="icon9" alt="" src="/icon-6.svg" />
                    <div className="gb-of-storage-wrapper">
                      <div className="gb-of-storage">10GB of Storage</div>
                    </div>
                  </div>
                  <div className="hobby-feature-list4">
                    <div className="icon-container">
                      <img className="icon10" alt="" src="/icon-6.svg" />
                    </div>
                    <div className="community-support-parent">
                      <div className="community-support">{`Community Support `}</div>
                      <div className="discord">(Discord)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pro-badge">
                <div className="section-pro">
                  <div className="pro-name-container">
                    <img
                      className="image-absolute-icon"
                      alt=""
                      src="/image-absolute.svg"
                    />
                    <button className="div-plan-name-pro">
                      <img
                        className="image-icon1"
                        alt=""
                        src="/image-1@2x.png"
                      />
                      <div className="pro-name-label">
                        <div className="pro">Pro</div>
                      </div>
                    </button>
                    <div className="pro-price">$50</div>
                  </div>
                  <div className="pro-description">
                    <div className="paragraph-mt-21">
                      <div className="perfect-for-building">
                        Perfect for building and
                      </div>
                      <div className="scaling-models-with">
                        scaling models with
                      </div>
                      <div className="limited-context">limited context.</div>
                    </div>
                  </div>
                  <div className="pro-signup-button">
                    <button className="link-sign-up1">
                      <div className="sign-up2">Sign Up</div>
                    </button>
                  </div>
                  <div className="pro-features-container">
                    <div className="list-order-last">
                      <div className="item-flex">
                        <img className="icon11" alt="" src="/icon-11.svg" />
                        <div className="pro-feature-details">
                          <div className="unlimited-interactions">
                            Unlimited Interactions
                          </div>
                        </div>
                      </div>
                      <div className="item-flex1">
                        <img className="icon12" alt="" src="/icon-11.svg" />
                        <div className="per-interaction-wrapper">
                          <div className="per-interaction">
                            $0.09 per Interaction
                          </div>
                        </div>
                      </div>
                      <div className="item-flex2">
                        <img className="icon13" alt="" src="/icon-11.svg" />
                        <div className="deploy-10-apps-wrapper">
                          <div className="deploy-10-apps">Deploy 10 Apps</div>
                        </div>
                      </div>
                      <div className="item-flex3">
                        <img className="icon14" alt="" src="/icon-11.svg" />
                        <div className="connect-10-collections-wrapper">
                          <div className="connect-10-collections">
                            Connect 10 Collections
                          </div>
                        </div>
                      </div>
                      <div className="item-flex4">
                        <img className="icon15" alt="" src="/icon-11.svg" />
                        <div className="tb-of-storage-wrapper">
                          <div className="tb-of-storage">1TB of Storage</div>
                        </div>
                      </div>
                      <div className="item-flex5">
                        <img className="icon16" alt="" src="/icon-11.svg" />
                        <div className="community-email-support-wrapper">
                          <div className="community-email">{`Community & Email Support`}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-most-popular">
                  <div className="most-popular">Most Popular</div>
                </div>
              </div>
              <div className="section-enterprise">
                <button className="div-plan-name-enterprise">
                  <img className="image-icon2" alt="" src="/image-2.svg" />
                  <div className="enterprise-name-label">
                    <div className="enterprise">Enterprise</div>
                  </div>
                </button>
                <div className="enterprise-description">
                  <h1 className="custom">Custom</h1>
                  <div className="paragraph-mt-22">
                    <div className="for-large-scale">
                      For large scale models
                    </div>
                    <div className="with-large-and">with large and ever-</div>
                    <div className="changing-context">changing context.</div>
                  </div>
                </div>
                <div className="enterprise-signup-button">
                  <button className="link-sign-up2">
                    <div className="request-access">Request Access</div>
                  </button>
                </div>
                <div className="enterprise-features">
                  <div className="enterprise-feature-list">
                    <img className="icon17" alt="" src="/icon-6.svg" />
                    <div className="enterprise-feature-details">
                      <div className="unlimited-interactions1">
                        Unlimited Interactions
                      </div>
                    </div>
                  </div>
                  <div className="enterprise-custom-pricing">
                    <div className="enterprise-pricing-icon">
                      <img className="icon18" alt="" src="/icon-6.svg" />
                    </div>
                    <div className="enterprise-pricing-label">
                      <div className="custom-interaction">{`Custom Interaction `}</div>
                      <a className="pricing1">Pricing</a>
                    </div>
                  </div>
                  <div className="enterprise-feature-list1">
                    <img className="icon19" alt="" src="/icon-6.svg" />
                    <div className="unlimited-apps-wrapper">
                      <div className="unlimited-apps">Unlimited Apps</div>
                    </div>
                  </div>
                  <div className="enterprise-feature-list2">
                    <img className="icon20" alt="" src="/icon-6.svg" />
                    <div className="unlimited-collections-wrapper">
                      <div className="unlimited-collections">
                        Unlimited Collections
                      </div>
                    </div>
                  </div>
                  <div className="enterprise-feature-list3">
                    <img className="icon21" alt="" src="/icon-6.svg" />
                    <div className="unlimited-storage-wrapper">
                      <div className="unlimited-storage">Unlimited Storage</div>
                    </div>
                  </div>
                  <div className="enterprise-feature-list4">
                    <img className="icon22" alt="" src="/icon-6.svg" />
                    <div className="dedicated-support-wrapper">
                      <div className="dedicated-support">Dedicated Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-dedicated-support">
              <div className="support-content">
                <div className="div-lgflex">
                  <div className="dedicated-support-parent">
                    <h2 className="dedicated-support1">Dedicated Support</h2>
                    <div className="paragraph-mt-3">
                      <div className="we-are-here">
                        We are here to help get you started with a dedicated
                      </div>
                      <div className="support-engineer-who">
                        support engineer who can assist with scoping your first
                      </div>
                      <div className="models-and-getting">
                        models and getting them deployed.
                      </div>
                    </div>
                  </div>
                  <div className="h4-my-5">
                    <div className="whats-included">What’s included</div>
                  </div>
                  <div className="list-grid">
                    <div className="inclusion-items">
                      <div className="inclusion-item-container">
                        <div className="inclusion-item-content">
                          <img className="icon23" alt="" src="/icon-6.svg" />
                          <div className="slack-label">
                            <div className="shared-slack-channel">
                              Shared Slack Channel
                            </div>
                          </div>
                        </div>
                        <div className="engineering-icon">
                          <div className="engineering-label">
                            <img className="icon24" alt="" src="/icon-6.svg" />
                          </div>
                          <div className="engineering-name-label">
                            <div className="prompt-engineering">{`Prompt Engineering `}</div>
                            <div className="guidance">Guidance</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="engineer-icon">
                      <div className="engineer-label">
                        <div className="engineer-support-icon">
                          <img className="icon25" alt="" src="/icon-6.svg" />
                        </div>
                        <div className="engineer-name-label">
                          <div className="dedicated-support2">{`Dedicated Support `}</div>
                          <div className="engineer">Engineer</div>
                        </div>
                      </div>
                      <div className="sourcing-icon">
                        <img className="icon26" alt="" src="/icon-6.svg" />
                        <div className="sourcing-label">
                          <div className="context-sourcing-guidance">
                            Context Sourcing Guidance
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-request-box">
                <div className="div-text-center">
                  <div className="add-on-pricing">
                    <button className="add-on-price">
                      <button className="div-add-on">
                        <img
                          className="image-h-5-icon"
                          alt=""
                          src="/image-h5.svg"
                        />
                        <div className="add-on-badge-label">
                          <div className="add-on">Add On</div>
                        </div>
                      </button>
                    </button>
                    <div className="add-on-frequency">
                      <div className="add-on-value">
                        <div className="add-on-price1">$750</div>
                      </div>
                      <div className="span-text-base">
                        <div className="monthly">monthly</div>
                      </div>
                    </div>
                  </div>
                  <div className="contract-link">
                    <button className="link-btn-22">
                      <div className="request-access1">Request Access</div>
                    </button>
                    <div className="paragraph-mt-31">
                      <div className="no-long-term">
                        No long term contract obligation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="div-flex2">
        <img className="div-hidden-icon" alt="" src="/div-hidden.svg" />
        <div className="links-column">
          <div className="links-container">
            <div className="first-link-item">
              <img className="icon27" alt="" src="/icon.svg" />
            </div>
            <img className="image-icon3" alt="" src="/image-3.svg" />
          </div>
          <div className="middle-links">
            <div className="middle-links-container">
              <div className="h4-pb-6">
                <div className="links">Links</div>
              </div>
              <div className="features-link">
                <div className="features1">Features</div>
              </div>
              <div className="pricing-docs">
                <div className="pricing2">Pricing</div>
                <div className="docs1">Docs</div>
              </div>
              <div className="blog1">Blog</div>
            </div>
            <div className="frame-parent">
              <div className="h4-pb-6-parent">
                <div className="h4-pb-61">
                  <div className="solutions">Solutions</div>
                </div>
                <div className="slack-bot">Slack Bot</div>
              </div>
              <div className="discord-bot">Discord Bot</div>
              <div className="command">Command</div>
              <div className="onsite-chat">Onsite Chat</div>
            </div>
            <div className="legal-container-parent">
              <div className="legal-container">
                <div className="h4-pb-62">
                  <div className="legal">Legal</div>
                </div>
                <div className="terms-of-service">Terms of Service</div>
              </div>
              <div className="privacy-policy">Privacy Policy</div>
            </div>
          </div>
        </div>
        <div className="paragraph-text-base-parent">
          <div className="paragraph-text-base">
            <div className="copyright-2024">
              Copyright © 2024 Scout. All rights reserved.
            </div>
          </div>
          <div className="social-icons">
            <div className="div-w-13">
              <img
                className="image-mx-auto-icon"
                alt=""
                src="/image-mxauto.svg"
              />
            </div>
            <img
              className="div-w-13-icon"
              loading="lazy"
              alt=""
              src="/div-w13.svg"
            />
            <img className="div-w-13-icon1" alt="" src="/div-w13-1@2x.png" />
          </div>
        </div>
      </footer>
    </div>
  );
};

TestimonialContent.propTypes = {
  className: PropTypes.string,
};

export default TestimonialContent;
