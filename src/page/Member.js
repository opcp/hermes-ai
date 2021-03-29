import { Table } from "react-bootstrap";

function Member() {
  return (
    <>
      <section className="memberContainer">
        <div className="memberBody">
        <h2>會員資料</h2>
          <Table striped bordered hover size={"lg"}>
            <tbody>
              <tr>
                <td>會員帳號</td>
                <td>Mark</td>
              </tr>
              <tr>
                <td>聯絡人姓名</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>聯絡人電話</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>聯絡人信箱</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>公司名稱</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>公司地址</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>公司電話</td>
                <td>Jacob</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default Member;
