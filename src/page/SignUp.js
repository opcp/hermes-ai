import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../components/img/AI-logo-column.png";

function Signup() {
  return (
    <>
      <section className="signUpContainer">
        <div className="signUpWrap">
          <div className="signUpLogo">
            <img src={logo} />
          </div>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>姓名</Form.Label>
              <Form.Control type="text" placeholder="姓名" />
            </Form.Group>
            <Form.Group>
              <Form.Label>公司</Form.Label>
              <Form.Control type="text" placeholder="公司" />
            </Form.Group>
            <Form.Group>
              <Form.Label>聯絡電話</Form.Label>
              <Form.Control type="text" placeholder="聯絡電話" />
            </Form.Group>

            <div className="signUpBtn">
              {`已有帳號? `}
              <Link to="/login">登入</Link>

              <Button variant="primary" type="button">
              確認送出
            </Button>
            </div>

            
          </Form>
        </div>
      </section>
    </>
  );
}

export default Signup;
