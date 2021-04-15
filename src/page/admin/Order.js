import React from 'react'
import { useState } from 'react'
import { fetchAllOrder } from '../../module/model/database/order'
import admin from '../../module/controller/Admin/Admin'
import { useEffect } from 'react'
import { fetchPackage } from '../../module/model/database/package'
import _ from 'lodash'
import { ORDER_STATUS_MAP } from '../../module/constants'
import Table from '../../components/Table'
import { Refresh } from '@material-ui/icons'
import { Container } from 'react-bootstrap'

function Order(props) {
  const columns = [
    // { title: '訂單編號', field: 'order_id', editable: false },
    { title: '企業編號', field: 'group_id', editable: 'never' },
    { title: '方案', field: 'package_name', editable: 'never' },
    {
      title: '單價',
      field: 'price',
      align: 'right',
      editable: 'never',
      type: 'currency',
    },
    { title: '數量', field: 'amount', align: 'right', editable: 'never' },
    {
      title: '小計',
      field: 'total',
      align: 'right',
      editable: 'never',
      type: 'currency',
    },
    {
      title: '點數總計',
      field: 'total_points',
      align: 'right',
      editable: 'never',
    },
    {
      title: '狀態',
      field: 'status',
      lookup: ORDER_STATUS_MAP,
      cellStyle: (val, rowData) => ({
        color: rowData.status === 0 ? 'red' : 'green',
      }),
      defaultSort: 'asc',
      // 多重排序，狀態正序 => 時間倒序
      customSort: (
        { status: sA, create_time: tA },
        { status: sB, create_time: tB }
      ) => {
        if (sA !== sB) {
          return sA === 0 ? -1 : 1
        }
        const msA = new Date(tA).getTime()
        const msB = new Date(tB).getTime()

        return msB - msA
      },
    },
    {
      title: '訂單時間',
      field: 'create_time',
      type: 'datetime',
      editable: 'never',
    },
  ]

  const [tableData, setTableData] = useState([])
  const [refreshTable, setRefreshTable] = useState(false)

  useEffect(() => {
    async function updateData() {
      const order = await fetchAllOrder()
      const packageDataList = await fetchPackage()
      const packageMap = _.chain(packageDataList)
        .compact()
        .keyBy('package_id')
        .value()
      const result = order.map((obj) => {
        const packageData = packageMap[obj.package_id]
        const { price, points, package_name } = packageData ?? {}
        return {
          ...obj,
          package_name,
          price,
          total: price * obj.amount,
          total_points: obj.amount * points,
        }
      })
      setTableData(result)
      setRefreshTable(false)
    }
    updateData()
  }, [refreshTable])

  return (
    <Container>
      <Table
        columns={columns}
        data={tableData}
        isLoading={refreshTable}
        editable={{
          isEditable: (rowData) => rowData.status === 0,
          isDeletable: () => false,
          onRowUpdate: (newData, oldData) =>
            admin
              .enableOrder(
                newData.order_id,
                newData.create_time,
                '',
                newData.group_id
              )
              .then(() => {
                const index = oldData.tableData.id
                const newTableData = [...tableData]
                newTableData[index] = { ...newData }
                setTableData(newTableData)
              }),
        }}
        actions={[
          {
            icon: Refresh,
            tooltip: 'refresh table',
            isFreeAction: true,
            onClick: (event, rowData) => {
              setRefreshTable(true)
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        title="訂單管理"
      />
    </Container>
  )
}

export default Order
