import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [RegisteredModalShow, setRegisteredModalShow] = useState(false);
  const [LoginModalShow, setLoginModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(true);

  return (
    <>
      <Router>
        <section className="menuContainer">
          <nav className="menuWrap">
            <div id="menuLogo">
              <Link to="/">
                <img
                  src={Logo}
                  width="80"
                  alt="HermesAI Logo"
                  title="HermesAI Logo"
                />
              </Link>
            </div>
            <div className="menuList">
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
            <div className="menuLogin">
              {loginStatus ? (
                // <FontAwesomeIcon icon={faUserCircle} className="userLogo" />
                <Dropdown >
                  <Dropdown.Toggle as={"div"} className="userLogo">
                    <FontAwesomeIcon icon={faUserCircle} />
                  </Dropdown.Toggle>
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="outline-info">註冊</Button>
              )}

              
                {loginStatus ? (
                  //  <Button variant="outline-primary">登出</Button>
                  <div>
                    <Link to="/login"></Link>
                    <span>登出</span>
                  </div>
                ) : (
                  <Button variant="outline-primary">登入</Button>
                )}
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
