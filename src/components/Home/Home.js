import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import ExampleCarousel from "../Carousel/ExampleCarousel";
import Footer from "../Footer/Footer";
import Contract from "../Contract/Contract";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  // const imageRef = useRef(null);
  // const [scroll, setScroll] = useState();
  AOS.init({
    duration: 1200,
  });

  // let callback = (entries) => {
  //   const [entry] = entries;
  //   setIsVisible(entry.isIntersecting);
  // };

  return (
    <>
      <section className="homeContainer">
        <section className="homeHeader homeCarouselText">
          <div className="homeMiddle">
            <div className="homeHeaderText">
              <div className="homeHeaderAnimate">
                <span>Get</span>
                <span>started</span>
                <span>with</span>
                <span>easy</span>
                <span>and</span>
                <span>fast</span>
                <span>AI</span>
                <span>tool</span>
                <p>
                  Explore Hermes AI, ready-to-use image recognition to suit your
                  specific needs.
                </p>
              </div>
              {/* <p>Get started with</p>
              <p>easy and fast AI tool</p> */}

              {/* <div className="homeHeaderBtn">
                <Link to="/demo">
                  <Button variant="primary">試用</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="info">註冊</Button>
                </Link>
              </div> */}
            </div>
          </div>
        </section>
        <ExampleCarousel />
        {/* Hermes  */}
        <section className="homeHermesSection">
          <div className="homeMiddle">
            <div className="homeSectionTitle">
              <span data-aos="zoom-out" > Hermes AI </span>
            </div>
            <div className="homeHermes">
              <div className="homeHermesBox">
                <div className="homeHermesBoxImg">
                  <img
                    data-aos="fade-right"
                    src={"https://picsum.photos/id/337/500/400"}
                  ></img>
                </div>
                <div className="homeHermesBoxText">
                  <h2>
                    Connect your store to give regular emails a sales boost
                  </h2>
                  <span>
                    Do more with your marketing using the power of analytics.
                    Sync your store data and get pre-built customer segments
                    based on purchase behavior to improve your sales.
                  </span>
                </div>
              </div>
              <div className="homeHermesBox revert">
                <div className="homeHermesBoxImg">
                  <img
                    data-aos="fade-left"
                    src={"https://picsum.photos/id/330/500/400"}
                  ></img>
                </div>
                <div className="homeHermesBoxText">
                  <h2>
                    Connect your store to give regular emails a sales boost
                  </h2>
                  <span>
                    Do more with your marketing using the power of analytics.
                    Sync your store data and get pre-built customer segments
                    based on purchase behavior to improve your sales.
                  </span>
                </div>
              </div>
              <div className="homeHermesBox">
                <div className="homeHermesBoxImg">
                  <img
                    data-aos="fade-right"
                    src={"https://picsum.photos/id/137/500/400"}
                  ></img>
                </div>
                <div className="homeHermesBoxText">
                  <h2>
                    Connect your store to give regular emails a sales boost
                  </h2>
                  <span>
                    Do more with your marketing using the power of analytics.
                    Sync your store data and get pre-built customer segments
                    based on purchase behavior to improve your sales.
                  </span>
                </div>
              </div>
              <div className="homeHermesBox revert">
                <div className="homeHermesBoxImg">
                  <img
                    data-aos="fade-left"
                    src={"https://picsum.photos/id/397/500/400"}
                  ></img>
                </div>
                <div className="homeHermesBoxText">
                  <h2>
                    Connect your store to give regular emails a sales boost
                  </h2>
                  <span>
                    Do more with your marketing using the power of analytics.
                    Sync your store data and get pre-built customer segments
                    based on purchase behavior to improve your sales.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hermes Help */}
        <section className="homeMiddle">
          {/* <ExampleCarousel /> */}
          <div className="homeSection">
            <div className="homeSectionTitle">
              <span>We'll help you</span>
            </div>

            <div className="homeExample">
              <div className="homeExampleCard">
                <img
                  data-aos="zoom-up"
                  src={"https://picsum.photos/id/337/300/200"}
                ></img>
                <h4>Award-winning support</h4>
                <span>
                  Get the help you need, whenever you need it with our 24/7
                  support.
                </span>
                <a href="#">Learn More</a>
              </div>
              <div className="homeExampleCard">
                <img
                  data-aos="zoom-up"
                  src={"https://picsum.photos/id/637/300/200"}
                ></img>
                <h4>Award-winning support</h4>
                <span>
                  Get the help you need, whenever you need it with our 24/7
                  support.
                </span>
                <a href="#">Learn More</a>
              </div>
              <div className="homeExampleCard">
                <img
                  data-aos="zoom-up"
                  src={"https://picsum.photos/id/377/300/200"}
                ></img>
                <h4>Award-winning support</h4>
                <span>
                  Get the help you need, whenever you need it with our 24/7
                  support.
                </span>
                <a href="#">Learn More</a>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Contract />
      <Footer />
    </>
  );
}

export default Home;
