import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import hermes from "../img/hermes3.jpg";

function Header() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${hermes})` }}
        className="header_section"
      >
        <div className="header_wrap">
          <div id="container">
            {/* <h1>
              <span>
                <i>The</i>
              </span>
              <span>
                <i>best</i>
              </span>
              <span>
                <i>products</i>
              </span>
              <span>
                <i>start</i>
              </span>
              <span>
                <i>with</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
              <span>
                <i>Sketch</i>
              </span>
            </h1> */}
            <h1>Get started with advanced pre-trained models</h1>
            <br />
            <p>
              Create, prototype, collaborate, and bring your ideas to life with
              the design platform used by over one million people — from
              freelancers, to the world’s largest teams.
            </p>
            <Link to="/demo">
              <Button variant="outline-primary">試用</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline-info">註冊</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
