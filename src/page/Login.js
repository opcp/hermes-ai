import { Form, Button } from 'react-bootstrap'
import loginImage from '../components/img/hermesAI.jpg'
import logo from '../components/img/AI-logo-column.png'
import credential from '../module/controller/Credential/credential'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { LogContext } from '../Main'
import swal from 'sweetalert'
import TextField from '@material-ui/core/TextField'

function Login(prop) {
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const status = useContext(LogContext)
  const history = useHistory()
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    if (prop.admin) {
      setAdmin(true)
    }
  }, [isAdmin])

  function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        if (isAdmin) {
          res(credential.signInAsAdmin(email, password))
        } else {
          res(credential.signIn(email, password))
        }
      }
    })
      .then(async (data) => {
        console.log(data)
        await swal('登入成功', '將在3秒後跳轉至首頁', 'success', {
          button: false,
          timer: 2700,
        })
        if (isAdmin) {
          status.setAdmin(true)
        } else {
          status.setStatus(true)
        }

        console.log(status.loginStatus)

        // status.setUserData(data.group);
        setTimeout(() => {
          history.push('/')
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
        const { code } = error
        if (code === 'auth/invalid-email') {
          swal('帳號錯誤', {
            icon: 'error',
          })
        } else if (code === 'auth/wrong-password') {
          swal('密碼錯誤', {
            icon: 'error',
          })
        }
      })
  }

  const keypress = e => {
    if (e.which === 13) {
      signIn(account, password)
    }
  }

  return (
    <>
      <section
        className="loginContainer"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <div className="loginMiddle">
          <div className="loginInput">
            <div className="loginLogo">
              <img alt="hermesLogo" src={logo} />
            </div>
            <Form onKeyPress={keypress}>
              <Form.Group>
                <Form.Label>帳號</Form.Label>
                <Form.Control
                  type="email"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="帳號"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>密碼</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="密碼"
                />
              </Form.Group>
              <div className="loginBtn">
                <Button
                  onClick={() => signIn(account, password)}
                  variant="primary"
                  type="button"
                >
                  登入
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
