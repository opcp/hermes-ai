import { Form, Button } from "react-bootstrap";

function Login() {
  return (
    <>
      <section className="loginContainer">
        <div className="loginWrap">
          <div className="loginInput">
            <h3>Hermes AI Login</h3>
            <Form>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Account</Form.Label>
                <Form.Control type="text" placeholder="Enter Account" />
              </Form.Group>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="login_btn">
                <Button variant="primary" type="button">
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
