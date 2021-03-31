import { Form, Button } from "react-bootstrap";
import loginImage from "../components/img/hermesAI.jpg";
import logo from "../components/img/AI-logo-column.png";
import credential from "../module/Credential/credential";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { LogContext } from "../components/Menu/Menu";
import swal from 'sweetalert';

function Login() {
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const status = useContext(LogContext)
  const history = useHistory()

   function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signIn(email, password));
      }
    })
      .then(() => {
        swal("登入成功", "將在3秒後跳轉至首頁", "success", {
          button: false,
          timer: 2000,
        });
        status.setStatus(true)
        setTimeout(() => {
          history.push('/')
        }, 3000);
        
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Form>
              <Form.Group >
                <Form.Label>帳號</Form.Label>
                <Form.Control type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="帳號" />
              </Form.Group>
              <Form.Group >
                <Form.Label>密碼</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密碼" />
              </Form.Group>
              <div className="loginBtn">
                <Button onClick={() => signIn(account, password)} variant="primary" type="button">
                  登入
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
