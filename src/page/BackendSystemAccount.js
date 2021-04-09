import React from 'react'
import MaterialTable from 'material-table'
import credential from '../module/controller/Credential/credential'
import { useHistory } from 'react-router'
import { useState } from 'react'
import order from '../module/controller/Order/order'
import { fetchOrderByStatus } from '../module/model/database/order'
import admin from '../module/controller/Admin/Admin'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { fetchPackage } from '../module/model/database/package'

function BackendSystemAccount(prop) {
  // const history = useHistory()
  // if (!credential.user) {
  //   history.push("/");
  //   return null;
  // }

  const [columns, setColumns] = useState([
    { title: '訂單', field: 'order_id' },
    { title: '方案', field: 'package_id' },
    { title: '數量', field: 'amount' },
    { title: '點數', field: 'points' },
    { title: '價格', field: 'price' },
    { title: '狀態', field: 'status' },
    { title: '訂單時間', field: 'create_time', type: 'datetime' },
  ])

  const [orderData, setData] = useState(null)
  const [pointTerm, getPointTerm] = useState(null)

  const getOrderByStatus = (status = 0) => {
    fetchOrderByStatus(status).then((data) => setData(data))
  }

  useEffect(()=>{},[])

  // useEffect(() => {
  //   fetchPackage().then((data) => getPointTerm(Object.values(data)))
  //   getOrderByStatus()
  // }, [])
  console.log(orderData)
  console.log(pointTerm)

  let data = []
  if (orderData && pointTerm) {
    orderData.map((i) => {
      pointTerm.map((p) => {
        data.push({
          order_id: i.order_id,
          package_id: i.package_id,
          amount: i.amount,
          points: i.amount * p.points,
          price: i.amount * p.price,
          status: i.status === 0 ? '未審核' : '已審核',
          create_time: i.create_time
        })
      })
    })
  }

  return (
    <>
      <section className="memberContainer">
        <div className="memberBody">
          <h2>帳號審核</h2>
          <div>
            <Button onClick={() => getOrderByStatus(0)} variant="primary" style={{ marginRight: '20px' }}>
              未審核
            </Button>
            <Button onClick={() => getOrderByStatus(1)} variant="success">
              已審核
            </Button>
          </div>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              icons={prop.icon}
              columns={columns}
              data={orderData ?? []}
              actions={[
                (rowData) => ({
                  icon: 'check',
                  tooltip: 'check order',
                  onClick: (event, rowData) =>
                    admin.enableOrder(rowData.order_id, rowData.create_time),
                }),
              ]}
              options={{
                actionsColumnIndex: -1,
              }}
              title=""
              localization={{
                toolbar: {
                  searchTooltip: '搜尋',
                },
                pagination: {
                  labelRowsSelect: '列',
                  firstTooltip: '首頁',
                  previousTooltip: '上一頁',
                  nextTooltip: '下一頁',
                  lastTooltip: '最後頁',
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default BackendSystemAccount
