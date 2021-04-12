import { useState, useEffect } from 'react'
import { Table, InputGroup, Form, Col, Button } from 'react-bootstrap'
import order from '../../module/controller/Order/order'
import { fetchPackage } from '../../module/model/database/package'
import swal from 'sweetalert'
import { useHistory } from 'react-router'

function BuyPoints() {
  const [pointTerm, getPointTerm] = useState([{
    "create_time": "2021/04/06 11:19:20",
    "package_id": 1,
    "package_name": "預設",
    "points": 300,
    "price": 100000,
    "remark": "測試",
    "status": 1
  }, {
    "create_time": "2021/04/07 11:19:20",
    "package_id": 2,
    "package_name": "預設",
    "points": 600,
    "price": 200000,
    "remark": "測試",
    "status": 1
  }])
  const [chooseTerm, nowTerm] = useState(null)
  const history = useHistory()


  // useEffect(() => {
  //   fetchPackage().then((data) => getPointTerm(Object.values(data)))
  // }, [])

  const buyPointsAPI = () => {
    if (chooseTerm) {
      const data = pointTerm[chooseTerm]
      const { package_id, points } = data

      new Promise((res) => {
        res(order.purchase(points, package_id))
      })
        .then(() => {
          swal('購買成功', '將在3秒後跳轉至首頁', 'success', {
            button: false,
            timer: 2700,
          })

          setTimeout(() => {
            history.push('/')
          }, 3000)
        })
        .catch((error) => {
          console.warn(error)
        })
    } else {
      swal('請至少選擇一個方案', {
        icon: 'error',
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
                <Form.Group md={'4'} as={Col}>
                  點數
                </Form.Group>
                <Form.Group md={'4'} as={Col}>
                  價格
                </Form.Group>
                <Form.Group md={'3'} as={Col}></Form.Group>
              </Form.Row>
              <>
                <Form.Row className="points_row">
                  {pointTerm &&
                    pointTerm.map((i, index) => {
                      return (
                        <>
                          <Form.Group style={{ width: '100%' }}>
                            <Form.Check
                              id={`buyCheck${index}`}
                              className="points_column"
                            >
                              <Form.Check.Input
                                type="radio"
                                name="choose"
                                onClick={(e) => nowTerm(e.target.value)}
                                value={index}
                              />
                              <Form.Check.Label >
                                {i.price.toLocaleString('en-US')}
                              </Form.Check.Label>
                              <Form.Check.Label >
                                {i.points.toLocaleString('en-US')}點
                              </Form.Check.Label>
                            </Form.Check>
                          </Form.Group>
                        </>
                      )
                    })}
                </Form.Row>
              </>
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
