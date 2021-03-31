import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { createContext, useContext, useEffect, useState } from "react";
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

// Router API
import { useHistory } from "react-router-dom";

// firebase
import credential from "../../module/Credential/credential";

function Menu() {
  const [RegisteredModalShow, setRegisteredModalShow] = useState(false);
  const [LoginModalShow, setLoginModalShow] = useState(false);
  const [loginStatus, setStatus] = useState(false);

  function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signIn(email, password));
      }
    })
      .then((data) => {
        // window.location.href='/'
        setStatus(true)
        alert("登入成功");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function signOut() {
    new Promise((res) => {
      res(credential.signOut());
    })
      .then((data) => {
        // window.location.href='/'
        console.log(data);
        setStatus(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function signUp(email, password, option) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signUp(email, password, option));
      }
    })
      .then((data) => {
        alert('註冊成功');
        signIn(email, password);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const logFunc = {
    signIn,
    signOut,
    signUp,
  };

  const funcProvider = createContext(null);

  useEffect(() => {
    if (credential.user) {
      setStatus(true);
    }
  }, [loginStatus]);

  return (
    <>
      <Router>
        <funcProvider.Provider value={logFunc}>
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
                  {/* <Link to="/demo">
                    <li>試用</li>
                  </Link>
                  <Link to="/POC">
                    <li>POC</li>
                  </Link> */}
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
                      {/* <span>Shan</span> */}
                    </Dropdown.Toggle>
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <Dropdown.Menu align={{ sm: "left" }}>
                      <Dropdown.Item as={Link} to="/Member">
                        會員資料
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/MemberOrder">
                        會員訂單
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to={{ pathname: "/signup", func: signUp }}>
                    <Button variant="outline-info">註冊</Button>
                  </Link>
                )}

                {loginStatus ? (
                  //  <Button variant="outline-primary">登出</Button>
                  <div className="userLogout">
                    <Button onClick={() => signOut()} variant="outline-danger">
                      登出
                    </Button>
                  </div>
                ) : (
                  <Link to={{ pathname: "/login", func: signIn }}>
                    <Button variant="outline-primary">登入</Button>
                  </Link>
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
        </funcProvider.Provider>
      </Router>
    </>
  );
}

export default Menu;
