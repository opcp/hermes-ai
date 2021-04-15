import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import React, { createContext, useState, useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Footer from './components/Footer/Footer'
import Menu from './components/Menu/Menu'
import Home from './components/Home/Home'
import SignUp from './page/SignUp'
import Login from './page/Login'
import Contract from './components/Contract/Contract'
import Example from './page/Example'
import Member from './page/Member'
import MemberOrder from './page/MemberOrder'
import BuyPoints from './page/point/BuyPoints'
import credential from './module/controller/Credential/credential'
import Admin from './page/admin/Admin'
import ManageUser from './page/ManageUser'
import 'bootstrap/dist/css/bootstrap.min.css'

export const LogContext = createContext(null)

const afterFirstGetAuth = new Promise((res) =>
  credential.once('authChange', res)
)

function Main() {
  const [loginStatus, setStatus] = useState(false)
  const [hasGetAuth, setHasGetAuth] = useState(false)

  useEffect(() => {
    afterFirstGetAuth.then(async (user) => {
      const isSignIn = Boolean(user)
      if (isSignIn) {
        await credential.init()
      }
      setStatus(isSignIn)
      setHasGetAuth(true)
    })
  }, [])

  return (
    <LogContext.Provider value={{ loginStatus, setStatus }}>
      {hasGetAuth ? (
        <>
          <Router>
            <Switch>
              <Route path="/admin">
                <Admin></Admin>
              </Route>
              <Route>
                <Menu />
                <Switch>
                  <Route exact path="/">
                    <Container fluid className="bg-light p-0 main-content">
                      <Home></Home>
                    </Container>
                  </Route>
                  <Route>
                    <Container fluid className="bg-light p-0 main-content">
                      <Switch>
                        <Route path="/use-case" component={Example}></Route>
                        <Route path="/demo" component={Contract}></Route>
                        <Route path="/signup">
                          {loginStatus ? <Redirect to="/" /> : <SignUp />}
                        </Route>
                        <Route path="/login">
                          {loginStatus ? <Redirect to="/" /> : <Login />}
                        </Route>
                        <Route path="/member">
                          {loginStatus ? (
                            <Member
                              {...{
                                email: credential.user.email,
                                user_name: credential.user.user_name,
                                is_group_admin: credential.user.is_group_admin,
                                user_status: credential.user.status,
                                user_create_time:
                                  credential.user.user_create_time,
                                group_id: credential.group?.group_id,
                                company_name: credential.group?.company_name,
                                company_address:
                                  credential.group?.company_address,
                                company_tel: credential.group?.company_tel,
                                group_status: credential.group?.status,
                                contact_person_name:
                                  credential.group?.contact_person_name,
                                contact_person_tel:
                                  credential.group?.contact_person_tel,
                                contact_person_email:
                                  credential.group?.contact_person_email,
                                tax_id: credential.group?.tax_id,
                                group_create_time:
                                  credential.group?.create_time,
                              }}
                            />
                          ) : (
                            <Redirect to="/" />
                          )}
                        </Route>
                        <Route path="/memberOrder">
                          {loginStatus &&
                          credential.group?.status === 1 &&
                          credential.user?.is_group_admin ? (
                            <MemberOrder />
                          ) : (
                            <Redirect to="/" />
                          )}
                        </Route>
                        <Route path="/manage-user">
                          {loginStatus &&
                          credential.group?.status === 1 &&
                          credential.user?.is_group_admin ? (
                            <ManageUser group_id={credential.group?.group_id} />
                          ) : (
                            <Redirect to="/" />
                          )}
                        </Route>
                        <Route path="/buyPoints">
                          {loginStatus &&
                          credential.group?.status === 1 &&
                          credential.user?.is_group_admin ? (
                            <BuyPoints />
                          ) : (
                            <Redirect to="/" />
                          )}
                        </Route>
                        <Redirect to="/" />
                      </Switch>
                    </Container>
                  </Route>
                </Switch>
              </Route>
            </Switch>
          </Router>
          <Footer />
        </>
      ) : (
        <Container id="page-loader-container" fluid className="bg-light">
          <Spinner animation="border" variant="info" />
        </Container>
      )}
    </LogContext.Provider>
  )
}

export default Main
