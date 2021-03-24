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
{/* 單位名稱 單位地址 單位電話 稅籍編號 使用者名稱 職稱 會員類型 單位登入代號 使用者登入帳號 代理商代碼 */}
{/* 個人資料 目前可用點數 點數使用紀錄 點數購買紀錄 點數購買 */}
            
          </Form>
        </div>
      </section>
    </>
  );
}

export default Signup;
