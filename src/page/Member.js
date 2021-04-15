import { Container, Table } from 'react-bootstrap'
import { USER_STATUS_MAP } from '../module/constants'

function Member(props) {
  return (
    <Container bg="light" className="pt-5 pb-5">
      <Table bordered size={'lg'} className="info-table">
        <tbody>
          <tr className="section-title">
            <td colSpan="2">會員資料</td>
          </tr>
          <tr className="column-row">
            <td>會員帳號</td>
            <td>使用者名稱</td>
          </tr>
          <tr>
            <td>{props.email}</td>
            <td>{props.user_name}</td>
          </tr>
          <tr className="column-row">
            <td>狀態</td>
            <td>建立時間</td>
          </tr>
          <tr>
            <td>{USER_STATUS_MAP[props.user_status] ?? '---'}</td>
            <td>{props.user_create_time}</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered size={'lg'} className="info-table mt-4">
        <tbody>
          <tr className="section-title">
            <td colSpan="2">企業資料</td>
          </tr>
          <tr className="column-row">
            <td>企業編號</td>
            <td>企業名稱</td>
          </tr>
          <tr>
            <td>{props.group_id}</td>
            <td>{props.company_name}</td>
          </tr>
          {props.is_group_admin || props.user_status !== 0 ? (
            <>
              <tr className="column-row">
                <td>企業地址</td>
                <td>企業電話</td>
              </tr>
              <tr>
                <td>{props.company_address}</td>
                <td>{props.company_tel}</td>
              </tr>
              <tr className="column-row">
                <td>聯絡人名稱</td>
                <td>聯絡人電話</td>
              </tr>
              <tr>
                <td>{props.contact_person_name}</td>
                <td>{props.contact_person_tel}</td>
              </tr>
              <tr className="column-row">
                <td>聯絡人信箱</td>
                <td>稅籍編號</td>
              </tr>
              <tr>
                <td>{props.contact_person_email}</td>
                <td>{props.tax_id}</td>
              </tr>
              <tr className="column-row">
                <td>建立時間</td>
                <td></td>
              </tr>
              <tr>
                <td>{props.group_create_time}</td>
                <td></td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="2">目前企業正在審核中</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default Member
