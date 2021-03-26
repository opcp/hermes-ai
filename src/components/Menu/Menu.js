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
import Member from "../../page/Member";
import MemberOrder from "../../page/MemberOrder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import userLogo from "../img/icon/user-circle-solid.svg";
import Logo from "../img/AI-logo.png";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function Menu() {
  const [RegisteredModalShow, setRegisteredModalShow] = useState(false);
  const [LoginModalShow, setLoginModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(true);
  const [showDropdown, setDropdown] = useState(false);

  return (
    <>
      <Router>
        <ScrollToTop />
        <section className="menuContainer">
          <nav className="menuMiddle">
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
                {/* <Link to="/purchase">
                    <li>購買點數</li>
                  </Link> */}
                {loginStatus ? (
                  <Dropdown>
                    <li>
                      <Dropdown.Toggle as={"div"}>購買點數</Dropdown.Toggle>
                      {/* <span onMouseEnter={() => setDropdown(true)}>購買點數</span> */}
                      {/* <FontAwesomeIcon icon={faUser} /> */}
                      <Dropdown.Menu align={{ sm: "left" }}>
                        <Dropdown.Item as={Link} to="/Member">
                          目前可用點數
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/MemberOrder">
                          點數使用紀錄
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          點數購買紀錄
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          點數購買
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </li>
                  </Dropdown>
                ) : (
                  ""
                )}
                {loginStatus ? (
                  <Link to="/system">
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
                <Dropdown>
                  <Dropdown.Toggle as={"div"} className="userLogo">
                    <FontAwesomeIcon icon={faUserCircle} />
                    <img
                      src={userLogo}
                      width="30"
                      alt="User Logo"
                      title="User Logo"
                    ></img>
                    <span>name</span>
                  </Dropdown.Toggle>
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  <Dropdown.Menu align={{ sm: "left" }}>
                    <Dropdown.Item as={Link} to="/Member">
                      會員資料
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/MemberOrder">
                      會員訂單
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
                <div className="userLogout">
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
          <Route path="/purchase" component={Purchase}></Route>
          <Route path="/system" component={System}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/member" component={Member}></Route>
          <Route path="/memberOrder" component={MemberOrder}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default Menu;
