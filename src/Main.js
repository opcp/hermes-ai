import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect,
} from 'react-router-dom'
import React, { createContext,useState,useEffect } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Footer from './components/Footer/Footer'
import Menu from './components/Menu/Menu'
import Home from './components/Home/Home'
import SignUp from './page/SignUp'
import Login from './page/Login'
import Poc from './page/Poc'
import Purchase from './page/Purchase'
import BackendSystemAccount from './page/BackendSystemAccount'
import BackendSystemOrder from './page/BackendSystemOrder'
import Contract from './components/Contract/Contract'
import Example from './page/Example'
import Member from './page/Member'
import MemberOrder from './page/MemberOrder'
import BuyPoints from './page/point/BuyPoints'

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
import 'bootstrap/dist/css/bootstrap.min.css'
import credential from './module/controller/Credential/credential'
import _ from 'lodash'

export const LogContext = createContext(null)

const afterFirstGetAuth = new Promise((res) =>
  credential.once('authChange', res)
)

function Main() {
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
  const [loginStatus, setStatus] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isAdmin, setAdmin] = useState(false)
  const [hasGetAuth, setHasGetAuth] = useState(false)

  useEffect(() => {
    if (!hasGetAuth) {
      afterFirstGetAuth.then(async (user) => {
        if (user && !loginStatus) {
          await credential.init()
        }
        const isSignIn = Boolean(user)
        if (isSignIn !== loginStatus) {
          setStatus(isSignIn)
        }
        setHasGetAuth(true)
      })
    }
  })

  return (
    <LogContext.Provider
      value={{ loginStatus, setStatus, setUserData, setAdmin }}
    >
      {hasGetAuth ? (
        <>
          <Router>
            <Menu />
            <Container id="main-content" fluid className="bg-light p-0">
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/use-case" component={Example}></Route>
                <Route path="/demo" component={Contract}></Route>
                <Route path="/POC" component={Poc}></Route>
                <Route path="/purchase">
                  {loginStatus ? <Purchase /> : <Redirect to="/" />}
                </Route>
                <Route path="/signup">
                  {loginStatus ? <Redirect to="/" /> : <SignUp />}
                </Route>
                <Route path="/login">
                  {loginStatus ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route path="/member">
                  {loginStatus ? <Member /> : <Redirect to="/" />}
                </Route>
                <Route path="/memberOrder">
                  {loginStatus ? (
                    <MemberOrder icon={tableIcons} />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Route path="/buyPoints">
                  {loginStatus ? <BuyPoints /> : <Redirect to="/" />}
                </Route>
                <Route path="/admin/login">
                  <Login admin={true} />
                </Route>
                <Route path="/admin/group">
                  <backendSystemAccount icon={tableIcons} />
                </Route>
                <Route path="/admin/order">
                  <BackendSystemOrder icon={tableIcons} />
                </Route>
                <Route path="/admin">
                  <Redirect to="/admin/login" />
                </Route>
                <Redirect to="/" />
              </Switch>
            </Container>
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
