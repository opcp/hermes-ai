import { Link, withRouter } from 'react-router-dom'
import { Nav, Navbar, NavDropdown, Container, Image } from 'react-bootstrap'
import sweetAlert from 'sweetalert'
import { useContext } from 'react'
import { AccountCircle } from '@material-ui/icons'
import Logo from '../../assets/img/Hermes-AI-logo-landscape-bg-transparent.png'

// firebase
import credential from '../../module/controller/Credential/credential'
import { LogContext } from '../../Main'
import admin from '../../module/controller/Admin/Admin'
import { useState } from 'react'
import { useEffect } from 'react'

function NavBar(props) {
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
      await sweetAlert('登出成功', {
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
    <Navbar sticky="top" expand="sm" id="nav" className="shadow">
      <Container>
        <Link to="/admin">
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
            {loginStatus && admin.user_id && (
              <>
                <Nav.Item>
                  <Nav.Link
                    active={pathname === '/admin/order'}
                    onClick={() => history.push('/admin/order')}
                  >
                    訂單管理
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={pathname === '/admin/group'}
                    onClick={() => history.push('/admin/group')}
                  >
                    企業管理
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
          <Nav>
            {loginStatus && admin.user_id && (
              <Nav.Item>
                <NavDropdown
                  title={
                    <>
                      <AccountCircle />
                      <span className="ml-2">{`Hi, ${
                        loginStatus && admin.user_id
                          ? credential.user.user_name ?? ''
                          : ''
                      }`}</span>
                    </>
                  }
                >
                  <NavDropdown.Item onClick={() => signOut()}>
                    登出
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default withRouter(NavBar)
