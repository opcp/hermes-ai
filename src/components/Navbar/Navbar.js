import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Test from "../../page/Test";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

function Navbar() {
  const [RegisteredModalShow, setRegisteredModalShow] = useState(false);
  const [LoginModalShow, setLoginModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(true);

  return (
    <>
      <section className="nav_section">
        <nav className="nav_wrap">
          <div id="nav_logo">
            <img
              src="https://www.clarifai.com/hubfs/Momento%20Multimedia%20Theme/logo.svg"
              width="120"
              alt="Clarifai Logo"
              title="Clarifai Logo"
            />
          </div>
          <div className="nav_list">
            <ul>
              <li>案例</li>
              <li>試用</li>
              <li>POC</li>
              {loginStatus ? <li>購買點數</li> : ""}
              {loginStatus ? <li>使用系統</li> : ""}
              {/* <li>5</li> */}
            </ul>
          </div>
          <div className="nav_login">
            <Button variant="outline-info">註冊</Button>
            <Button variant="outline-primary">登入</Button>

            {/* <RegisteredModal show={RegisteredModalShow} onHide={() => setRegisteredModalShow(false)} />
            <LoginModal show={LoginModalShow} onHide={() => setLoginModalShow(false)}  /> */}
          </div>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
