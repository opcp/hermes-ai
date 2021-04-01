import { Table } from "react-bootstrap";
import { LogContext } from "../components/Menu/Menu";
import { useState, useContext } from "react";
import credential from "../module/Credential/credential";
import { useHistory } from "react-router";

function Member() {
  const LogData = useContext(LogContext);
  const history = useHistory();
  if (!credential.user) {
    history.push("/");
    return null
  }

  const {
    group_id,
    contact_person_email,
    contact_person_tel,
    user_name,
    contact_person_name,
    company_name,
    company_address,
    company_tel,
    create_time,
  } = credential.group;

  //   group:
  // agent_id: "test0401_2"
  // company_address: "台北市"
  // company_name: "servtech"
  // company_tel: "0921321321"
  // contact_person_email: "test0401_2@gmail.com"
  // contact_person_name: "test0401_2"
  // contact_person_tel: "0921321321"
  // create_time: "2021/04/01 11:40:02"
  // group_id: "test0401_2"
  // isAdmin: true
  // modify_time: "2021/04/01 11:40:02"
  // tax_id: "43214321"
  // url: "https://cloud.servtech.com.tw:59090/HermesAI/index.html"
  // user_name: "test0401_2"

  return (
    <>
      <section className="memberContainer">
        <div className="memberBody">
          <h2>會員資料</h2>
          <Table striped bordered hover size={"lg"}>
            <tbody>
              <tr>
                <td>企業ID</td>
                <td>{group_id}</td>
              </tr>
              <tr>
                <td>會員帳號</td>
                <td>{contact_person_email}</td>
              </tr>
              <tr>
                <td>使用者名稱</td>
                <td>{user_name}</td>
              </tr>
              <tr>
                <td>聯絡人姓名</td>
                <td>{contact_person_name}</td>
              </tr>
              <tr>
                <td>聯絡人電話</td>
                <td>{contact_person_tel}</td>
              </tr>
              <tr>
                <td>聯絡人信箱</td>
                <td>{contact_person_email}</td>
              </tr>
              <tr>
                <td>公司名稱</td>
                <td>{company_name}</td>
              </tr>
              <tr>
                <td>公司地址</td>
                <td>{company_address}</td>
              </tr>
              <tr>
                <td>公司電話</td>
                <td>{company_tel}</td>
              </tr>
              <tr>
                <td>創建時間</td>
                <td>{create_time}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default Member;
