import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import hermes from '../img/hermes3.jpg'

function Header() {
  return (
    <>
      <section
        style={{ backgroundImage: `url(${hermes})` }}
        className="headerContainer"
      >
        <div className="headerMiddle">
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
            <p>Get started with easy and fast AI tool</p>
            <p>Explore Hermes AI, ready-to-use image recognition</p>
            <p>to suit your specific needs.</p>
            {/* <Link to="/demo">
              <Button variant="outline-primary">試用</Button>
            </Link> */}
            <Link to="/signup">
              <Button variant="outline-info">註冊</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
