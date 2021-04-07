import React from 'react'
import MaterialTable from 'material-table'
import credential from '../module/controller/Credential/credential'
import { useHistory } from 'react-router'
import { useState } from 'react'
import order from '../module/controller/Order/order'
import { fetchOrderByStatus } from '../module/model/database/order'
import admin from '../module/controller/Admin/Admin'
import { useEffect } from 'react'

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
    { title: '狀態', field: 'status' },
    { title: '訂單時間', field: 'create_time', type: 'datetime' },
  ])

  const [data, setData] = useState(null)

  useEffect(() => {
    fetchOrderByStatus(1).then((data) => setData(data))
  }, [])

  console.log(data)
  console.log(order)
  return (
    <>
      <h1>123</h1>
    </>
  )
}

export default BackendSystemAccount
