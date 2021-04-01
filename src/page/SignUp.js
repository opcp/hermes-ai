import { useContext, useRef, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../components/img/AI-logo.png";
import notAccessCheck from "../components/img/icon/check-circle-regular.svg";
import accessCheck from "../components/img/icon/checked.png";

import credential from "../module/Credential/credential";
import { useHistory } from "react-router-dom";
import { LogContext } from "../components/Menu/Menu";
import swal from "sweetalert";

function Signup() {
  const status = useContext(LogContext);
  const history = useHistory();
  const [terms, setTerms] = useState(false);

  function signIn(email, password) {
    new Promise((res) => {
      if (email && password) {
        res(credential.signIn(email, password));
      }
    })
      .then(() => {
        status.setStatus(true);
        history.push("/");
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
      .then(async () => {
        await signIn(email, password);
        swal("註冊成功", "將在3秒後跳轉至首頁", "success", {
          button: false,
          timer: 1500,
        });

        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  const [formData, setFormData] = useState({
    email: null,
    password: null,
    group_id: null,
    isCompany: true,
    company_name: null,
    company_address: null,
    company_tel: null,
    contact_person_name: null,
    contact_person_tel: null,
    contact_person_email: null,
    ref_agent_id: null,
    tax_id: null,
    user_name: null,
  });

  const {
    isCompany,
    group_id,
    password,
    email,
    company_name,
    company_address,
    company_tel,
    contact_person_name,
    contact_person_tel,
    contact_person_email,
    ref_agent_id,
    tax_id,
    user_name,
  } = formData;

  return (
    <>
      <section className="signUpContainer">
        <div className="signUpMiddle">
          <div className="signUpForm">
            {/* <div className="signUpLogo">
              <img alt="hermesLogo" src={logo} />
            </div> */}
            <Form>
              <Form.Group id="formGridCheckbox">
                <Form.Check
                  onChange={() =>
                    setFormData({ ...formData, isCompany: !isCompany })
                  }
                  value={isCompany}
                  type="checkbox"
                  label="是否加入現有企業帳戶底下?"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>企業ID</Form.Label>
                <Form.Control
                  required
                  value={group_id}
                  onChange={(e) =>
                    setFormData({ ...formData, group_id: e.target.value })
                  }
                  type="text"
                  // pattern="^[a-zA-Z0-9]*$"
                  // title="請輸入英文數字組合"
                  placeholder="企業ID"
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={email}
                    pattern="^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$"
                    title="請輸入正確email格式"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>密碼</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    value={password}
                    minLength={6}
                    pattern="^[a-zA-Z0-9]*$"
                    title="請輸入英文數字組合"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="密碼"
                  />
                </Form.Group>
              </Form.Row>

              {isCompany ? (
                <>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>使用者名稱</Form.Label>
                      <Form.Control
                        required
                        value={user_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            user_name: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="使用者名稱"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>聯絡人名稱</Form.Label>
                      <Form.Control
                        required
                        value={contact_person_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact_person_name: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="聯絡人名稱"
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>聯絡人信箱</Form.Label>
                      <Form.Control
                        required
                        value={contact_person_email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact_person_email: e.target.value,
                          })
                        }
                        type="email"
                        placeholder="聯絡人信箱"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>聯絡電話</Form.Label>
                      <Form.Control
                        required
                        value={contact_person_tel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact_person_tel: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="聯絡電話"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>公司名稱</Form.Label>
                      <Form.Control
                        value={company_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_name: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="公司名稱"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>公司地址</Form.Label>
                      <Form.Control
                        value={company_address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_address: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="公司地址"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>公司電話</Form.Label>
                      <Form.Control
                        value={company_tel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_tel: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="公司電話"
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>稅籍編號</Form.Label>
                      <Form.Control
                        value={tax_id}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tax_id: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="稅籍編號"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group>
                    <Form.Label>推薦人 ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={ref_agent_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ref_agent_id: e.target.value,
                        })
                      }
                      placeholder="推薦人 ID"
                    />
                  </Form.Group>
                </>
              ) : (
                ""
              )}
              <div className="signUpTerms">
                <img alt="access" src={terms ? accessCheck : notAccessCheck} />
                <a
                  href="#"
                  onClick={() =>
                    swal({
                      buttons: { cancel: "不同意", confirm: "同意" },
                      title: "使用條款",
                      text:
                        "If set to true, the confirm button turns red and the default focus is set on the cancel button instead. This is handy when showing warning modals where the confirm action is dangerous (e.g. deleting an item).",
                    }).then((choose) => {
                      if (choose) {
                        setTerms(true);
                      } else {
                        setTerms(false);
                      }
                    })
                  }
                >
                  需同意使用者條款
                </a>
              </div>

              <div className="signUpBtn">
                {/* {`已有帳號? `}
                <Link to="/login">登入</Link> */}

                <Button
                  disabled={!terms}
                  onClick={() => {
                    if (terms) {
                      signUp(email, password, {
                        group_id,
                        isAdmin: isCompany,
                        company_name,
                        company_address,
                        company_tel,
                        contact_person_name,
                        contact_person_tel,
                        contact_person_email,
                        ref_agent_id,
                        tax_id,
                        user_name,
                      });
                    } else {
                      swal("需同意使用者條款才可註冊", {
                        icon: "error",
                      });
                    }
                  }}
                  // onSubmit={(e) => {
                  //   e.preventDefault();
                  // if (terms) {
                  // signUp(email, password, {
                  //   group_id,
                  //   isAdmin: isCompany,
                  //   company_name,
                  //   company_address,
                  //   company_tel,
                  //   contact_person_name,
                  //   contact_person_tel,
                  //   contact_person_email,
                  //   ref_agent_id,
                  //   tax_id,
                  //   user_name,
                  // });
                  // } else {
                  //   swal("需同意使用者條款才可註冊", {
                  //     icon: "error",
                  //   });
                  // }
                  // }}
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
