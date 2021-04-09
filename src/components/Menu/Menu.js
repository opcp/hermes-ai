import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import {
  Button,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
} from 'react-bootstrap'
import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert'
import userLogo from '../img/icon/user-circle-solid.svg'
import Logo from '../img/AI-logo.png'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

// firebase
import credential from '../../module/controller/Credential/credential'
import { LogContext } from '../../Main'


function Menu(props) {
  const { loginStatus, setStatus } = useContext(LogContext)
  const { history } = props

  async function signOut() {
    try {
      await credential.signOut()
      setStatus(false)
      await swal('登出成功', {
        icon: 'success',
        button: false,
        timer: 2200,
      })
      history.push('/')
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <>
      {/* <ScrollToTop /> */}
      <Navbar sticky="top" expand="sm" id="nav" className="shadow">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img
                src={Logo}
                width="200"
                alt="HermesAI Logo"
                title="HermesAI Logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={() => history.push('/use-case')}>
                  使用案例
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav>
              {loginStatus ? (
                <>
                  <Nav.Item>
                    <NavDropdown
                      title={
                        <>
                          <Image
                            src={userLogo}
                            width="30"
                            alt="User Logo"
                            title="User Logo"
                          ></Image>
                          <span className="ml-2">{`Hi, ${
                            loginStatus ? credential.user.user_name ?? '' : ''
                          }`}</span>
                        </>
                      }
                    >
                      <NavDropdown.Item onClick={() => history.push('/member')}>
                        會員資料
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => history.push('/memberOrder')}
                      >
                        會員訂單
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => history.push('/buyPoints')}
                      >
                        點數購買
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => credential.toHermesAI()}>
                        使用系統
                      </NavDropdown.Item>
                      <NavDropdown.Divider></NavDropdown.Divider>
                      <NavDropdown.Item onClick={() => signOut()}>
                        登出
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Link to="/signup">
                      <Button
                        variant="outline-success"
                        // href="/signup"
                        className="mr-2"
                      >
                        註冊
                      </Button>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/login">
                      <Button variant="outline-primary">登入</Button>
                    </Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(Menu)
