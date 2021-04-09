import { useState, useEffect } from 'react'
import { Table, InputGroup, Form, Col, Button } from 'react-bootstrap'
import order from '../../module/controller/Order/order'
import { fetchPackage } from '../../module/model/database/package'
import swal from 'sweetalert'
import { useHistory } from 'react-router'

function BuyPoints() {
  const [pointTerm, getPointTerm] = useState(null)
  const [chooseTerm, nowTerm] = useState(null)
  const history = useHistory()
  
  useEffect(() => {
    fetchPackage().then((data) => getPointTerm(Object.values(data)))
  }, [])

  const buyPointsAPI = () => {
    if (chooseTerm) {
      const data = pointTerm[chooseTerm]
      const { package_id, points } = data

      new Promise((res) => {
        res(order.purchase(points, package_id))
      }).then(() => {
        swal('購買成功', '將在3秒後跳轉至首頁', 'success', {
          button: false,
          timer: 2700,
        })

        setTimeout(() => {
          history.push('/')
        }, 3000)
      }).catch((error) => {
        console.warn(error)
      })
    }
  }

  return (
    <>
      <div className="mainContainer">
        <div className="buyPointsBody">
          <section className="buyPointsSection">
            <Form>
              <Form.Row>
                <Form.Group md={'1'} as={Col}></Form.Group>
                <Form.Group as={Col}>價格</Form.Group>
                <Form.Group as={Col}>方案</Form.Group>
              </Form.Row>

              {pointTerm &&
                pointTerm.map((i, index) => {
                  return (
                    <Form.Row key={index}>
                      <Form.Group md={'1'} as={Col}>
                        <Form.Check
                          onClick={(e) => nowTerm(e.target.value)}
                          value={index}
                          type="radio"
                          name="choose"
                        />
                      </Form.Group>
                      <Form.Group as={Col}>{i.price}</Form.Group>
                      <Form.Group as={Col}>{i.points}點</Form.Group>
                    </Form.Row>
                  )
                })}
              <div className="buyPointsButton">
                <Button onClick={() => buyPointsAPI(order)}>確認購買</Button>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </>
  )
}

export default BuyPoints
