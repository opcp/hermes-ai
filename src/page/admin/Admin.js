import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { useContext } from 'react'
import logo from '../../assets/img/Hermes-AI-logo-portrait-bg-transparent.png'

// firebase
import { LogContext } from '../../Main'
import Order from './Order'
import Group from './Group'
import admin from '../../module/controller/Admin/Admin'
import NavBar from './NavBar'
import { Container, Image } from 'react-bootstrap'

function Admin(props) {
  const { loginStatus } = useContext(LogContext)

  return (
    <>
      {loginStatus && admin.user_id ? (
        <>
          <NavBar></NavBar>
          <Container className="main-content pt-5 pb-5">
            <Switch>
              <Route path="/admin/group">
                <Group />
              </Route>
              <Route path="/admin/order">
                <Order />
              </Route>
              <Route path="/admin">
                <Redirect to="/admin/group" />
              </Route>
            </Switch>
          </Container>
        </>
      ) : (
        <Container
          style={{ minHeight: '100vh' }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Image width={200} alt="hermes-ai-logo" src={logo} className="mb-3" />
          <h2>很抱歉，您沒有權限存取此頁面</h2>
        </Container>
      )}
    </>
  )
}

export default withRouter(Admin)
