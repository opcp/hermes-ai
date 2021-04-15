import { Link, withRouter } from 'react-router-dom'
import { Button, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert'
import { AccountCircle } from '@material-ui/icons'
import Logo from '../../assets/img/Hermes-AI-logo-landscape-bg-transparent.png'

// firebase
import credential from '../../module/controller/Credential/credential'
import { LogContext } from '../../Main'

function Menu(props) {
  const { loginStatus, setStatus } = useContext(LogContext)
  const { history, location } = props
  const [pathname, setPathName] = useState(location.pathname)

  useEffect(() => {
    setPathName(location.pathname)
  }, [location])

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
                width="190"
                alt="HermesAI Logo"
                title="HermesAI Logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              <Nav.Item>
                <Nav.Link
                  onClick={() => history.push('/use-case')}
                  active={pathname === '/use-case'}
                >
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
                          <AccountCircle />
                          <span className="ml-2">{`Hi, ${
                            loginStatus ? credential.user.user_name ?? '' : ''
                          }`}</span>
                        </>
                      }
                    >
                      <NavDropdown.Item onClick={() => history.push('/member')}>
                        會員資料
                      </NavDropdown.Item>

                      {credential.group?.status === 1 &&
                        credential.user?.is_group_admin && (
                          <>
                            <NavDropdown.Item
                              onClick={() => history.push('/memberOrder')}
                            >
                              訂單紀錄
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => history.push('/buyPoints')}
                            >
                              點數購買
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => history.push('/manage-user')}
                            >
                              帳號管理
                            </NavDropdown.Item>
                          </>
                        )}
                      {credential.user?.status === 1 &&
                        credential.group?.url && (
                          <NavDropdown.Item
                            onClick={() => credential.toHermesAI()}
                          >
                            使用系統
                          </NavDropdown.Item>
                        )}
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
                        className="mr-2"
                        active={pathname === '/signup'}
                      >
                        註冊
                      </Button>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/login">
                      <Button
                        variant="outline-primary"
                        active={pathname === '/login'}
                      >
                        登入
                      </Button>
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
