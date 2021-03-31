import { useContext, useRef, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../components/img/AI-logo.png";
import credential from "../module/Credential/credential";
import { useHistory } from 'react-router-dom';
import { LogContext } from "../components/Menu/Menu"


function Signup() {
  const status = useContext(LogContext)
  const history = useHistory()

  function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signIn(email, password));
      }
    })
      .then(() => {
        status.setStatus(true)
        history.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function signUp(email, password, option) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signUp(email, password, option));
      }
    })
      .then(() => {
        signIn(email, password);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [groupId, setGroupId] = useState(null);

  const [formData, setFormData] = useState({
    email: null,
    password: null,
    groupId: null,
    isCompany: true
  });

  const { isCompany, groupId, password, email } = formData


  console.log(formData)
  return (
    <>
      <section className="signUpContainer">
        <div className="signUpMiddle">
          <div className="signUpForm">
            <div className="signUpLogo">
              <img alt="hermesLogo" src={logo} />
            </div>
            <Form>
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  onChange={() => setFormData({ ...formData, isCompany: !isCompany })}
                  value={isCompany}
                  type="checkbox"
                  label="是否加入現有企業帳戶底下?"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>企業ID</Form.Label>
                <Form.Control
                  value={groupId}
                  onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                  type="text"
                  placeholder="企業ID"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>密碼</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="密碼"
                />
              </Form.Group>

              {isCompany ? (
                <>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>使用者名稱</Form.Label>
                      <Form.Control type="text" placeholder="姓名" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>聯絡電話</Form.Label>
                      <Form.Control type="text" placeholder="聯絡電話" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>單位名稱</Form.Label>
                      <Form.Control type="text" placeholder="單位名稱" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>單位地址</Form.Label>
                      <Form.Control type="text" placeholder="單位地址" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>單位電話</Form.Label>
                      <Form.Control type="text" placeholder="單位電話" />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>稅籍編號</Form.Label>
                      <Form.Control type="text" placeholder="稅籍編號" />
                    </Form.Group>
                  </Form.Row>
                </>
              ) : (
                ""
              )}

              <div className="signUpBtn">
                {`已有帳號? `}
                <Link to="/login">登入</Link>

                <Button
                  onClick={() => { }}
                  onClick={() =>
                    signUp(email, password, {
                      group_id: groupId,
                      isAdmin: isCompany,
                    })
                  }
                  variant="primary"
                  type="button"
                >
                  確認送出
                </Button>
              </div>
              {/* 單位名稱 單位地址 單位電話 稅籍編號 使用者名稱 職稱 會員類型 單位登入代號 使用者登入帳號 代理商代碼 */}
              {/* 個人資料 目前可用點數 點數使用紀錄 點數購買紀錄 點數購買 */}
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Signup;
