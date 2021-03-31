import { Form, Button } from "react-bootstrap";
import loginImage from "../components/img/hermesAI.jpg";
import logo from "../components/img/AI-logo-column.png";
import credential from "../module/Credential/credential";
import { useState } from "react";

function Login(prop) {

  const loginFunc = prop.location.func

  const [account,setAccount] = useState(null)
  const [password,setPassword] = useState(null)

  console.log(loginFunc)

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
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Account</Form.Label>
                <Form.Control type="text" value={account} onChange={(e)=>setAccount(e.target.value)} placeholder="Enter Account" />
              </Form.Group>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" />
              </Form.Group>
              <div className="loginBtn">
                <Button onClick={()=>loginFunc(account,password)}  variant="primary" type="button">
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
