import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Button, Dropdown } from 'react-bootstrap'
import { createContext, useEffect, useState } from 'react'
import Home from '../Home/Home'
import SignUp from '../../page/SignUp'
import Login from '../../page/Login'
import Poc from '../../page/Poc'
import Purchase from '../../page/Purchase'
import backendSystemAccount from '../../page/BackendSystemAccount'
import BackendSystemOrder from '../../page/BackendSystemOrder'
import Contract from '../Contract/Contract'
import Example from '../../page/Example'
import Member from '../../page/Member'
import MemberOrder from '../../page/MemberOrder'
import BupPoints from '../../page/point/BuyPoints'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import swal from 'sweetalert'

import userLogo from '../img/icon/user-circle-solid.svg'
import Logo from '../img/AI-logo.png'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

// firebase
import credential from '../../module/controller/Credential/credential'

// material data table
import { forwardRef } from 'react'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

export const LogContext = createContext(null)
function Menu() {
  const [loginStatus, setStatus] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isAdmin, setAdmin] = useState(false)

  // material table icon global useContext
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  }

  function signOut() {
    new Promise((res) => {
      res(credential.signOut())
    })
      .then((data) => {
        setStatus(false)
        swal('登出成功', {
          icon: 'success',
          button: false,
          timer: 2700,
        })
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 2700);
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  useEffect(() => {
    if (credential.user) {
      setStatus(true)
    }
  }, [loginStatus, userData])

  return (
    <>
      <LogContext.Provider value={{ loginStatus, setStatus, setUserData, setAdmin }}>
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
                  {/* <Link to="/demo">
                    <li>試用</li>
                  </Link>
                  <Link to="/POC">
                    <li>POC</li>
                  </Link> */}
                  {isAdmin && (
                    <Dropdown>
                      <li>
                        <Dropdown.Toggle as={'div'}>管理員後台</Dropdown.Toggle>
                        <Dropdown.Menu align={{ md: 'left' }}>
                          <Dropdown.Item as={Link} to="/backendSystemAccount">
                            帳號審核
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/backendSystemOrder">
                            訂單審核
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </li>
                    </Dropdown>
                  )}
                  {loginStatus ? (
                    <Dropdown>
                      <li>
                        <Dropdown.Toggle as={'div'}>點數</Dropdown.Toggle>
                        {/* <span onMouseEnter={() => setDropdown(true)}>購買點數</span> */}
                        {/* <FontAwesomeIcon icon={faUser} /> */}
                        <Dropdown.Menu align={{ sm: 'left' }}>
                          <Dropdown.Item as={Link} to="/Member">
                            目前可用點數
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/backendSystem">
                            點數使用紀錄
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            點數購買紀錄
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/buyPoints">
                            點數購買
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </li>
                    </Dropdown>
                  ) : (
                    ''
                  )}
                  {loginStatus || isAdmin ? (
                    <li onClick={() => credential.toHermesAI()}>使用系統</li>
                  ) : (
                    ''
                  )}
                  {/* <li>5</li> */}
                </ul>
              </div>
              <div className="menuLogin">
                {loginStatus ? (
                  // <FontAwesomeIcon icon={faUserCircle} className="userLogo" />
                  <Dropdown>
                    <Dropdown.Toggle as={'div'} className="userLogo">
                      {/* <FontAwesomeIcon icon={faUserCircle} /> */}
                      <img
                        src={userLogo}
                        width="30"
                        alt="User Logo"
                        title="User Logo"
                      ></img>
                      <span>{credential.group.user_name}</span>
                    </Dropdown.Toggle>
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <Dropdown.Menu align={{ sm: 'left' }}>
                      <Dropdown.Item as={Link} to="/member">
                        會員資料
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/memberOrder">
                        會員訂單
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/signup">
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
                  <Link to="/login">
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
            <Route path="/signup" component={() => <SignUp />}></Route>
            <Route path="/adminLogin" component={() => <Login admin={true} />}></Route>
            <Route path="/login" component={() => <Login />}></Route>
            <Route path="/member" component={Member}></Route>
            <Route
              path="/memberOrder"
              component={() => <MemberOrder icon={tableIcons} />}
            ></Route>
            <Route path="/buyPoints" component={BupPoints}></Route>
            <Route
              path="/backendSystemAccount"
              component={() => <backendSystemAccount icon={tableIcons} />}
            ></Route>
            <Route
              path="/backendSystemOrder"
              component={() => <BackendSystemOrder icon={tableIcons} />}
            ></Route>
          </Switch>
        </Router>
      </LogContext.Provider>
    </>
  )
}

export default Menu
