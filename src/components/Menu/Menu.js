import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Home from "../Home/Home";
import SignUp from "../../page/SignUp";
import Login from "../../page/Login";
import Poc from "../../page/Poc";
import Purchase from "../../page/Purchase";
import System from "../../page/System";
import Contract from "../Contract/Contract";
import Example from "../../page/Example";
import Logo from "../img/AI-logo.png";
function Menu() {
  const [RegisteredModalShow, setRegisteredModalShow] = useState(false);
  const [LoginModalShow, setLoginModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(true);

  return (
    <>
      <Router>
        <section className="nav_section">
          <nav className="nav_wrap">
            <div id="nav_logo">
              <Link to="/">
                <img
                  src={Logo}
                  width="80"
                  alt="HermesAI Logo"
                  title="HermesAI Logo"
                />
              </Link>
            </div>
            <div className="nav_list">
              <ul>
                <Link to="/example">
                  <li>案例</li>
                </Link>
                <Link to="/demo">
                  <li>試用</li>
                </Link>
                <Link to="/POC">
                  <li>POC</li>
                </Link>
                {loginStatus ? (
                  <Link to="/Purchase">
                    <li>購買點數</li>
                  </Link>
                ) : (
                  ""
                )}
                {loginStatus ? (
                  <Link to="/System">
                    <li>使用系統</li>
                  </Link>
                ) : (
                  ""
                )}
                {/* <li>5</li> */}
              </ul>
            </div>
            <div className="nav_login">
              <Link to="/signup">
                <Button variant="outline-info">註冊</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-primary">登入</Button>
              </Link>
              {/* <RegisteredModal show={RegisteredModalShow} onHide={() => setRegisteredModalShow(false)} />
            <LoginModal show={LoginModalShow} onHide={() => setLoginModalShow(false)}  /> */}
            </div>
          </nav>
        </section>

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/example" component={Example}></Route>
          <Route path="/demo" component={Contract}></Route>
          <Route path="/POC" component={Poc}></Route>
          <Route path="/Purchase" component={Purchase}></Route>
          <Route path="/System" component={System}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default Menu;
