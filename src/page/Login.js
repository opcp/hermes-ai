import { Form, Button } from "react-bootstrap";

function Login() {
  return (
    <>
      <section className="loginContainer">
        <div className="loginWrap">
          <Form>
            {/* <Form.Row>
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="account" placeholder="Enter account" />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row> */}

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Account</Form.Label>
              <Form.Control type="account" placeholder="Enter Account" />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="button">
              登入
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Login;
