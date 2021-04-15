import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Table from '../components/Table'
import {
  fetchGroupAdministrator,
  fetchGroupUser,
} from '../module/model/database/userAndGroup'
import { Refresh } from '@material-ui/icons'
import { USER_STATUS_MAP } from '../module/constants'
import { updateUser } from '../module/model/database/userAndGroup'
import { signUp } from '../module/model/HermesAI/signUp'
import credential from '../module/controller/Credential/credential'
import { getUserId } from '../module/util'

function ManageUser(props) {
  const columns = [
    { title: 'Email', field: 'email', editable: 'never' },
    { title: '名稱', field: 'user_name', editable: 'never' },
    {
      title: '是否為管理員',
      field: 'is_group_admin',
      editable: 'never',
      emptyValue: '否',
      cellStyle: (val, rowData) => ({
        color: rowData.is_group_admin ? 'green' : 'black',
      }),
      lookup: {
        true: '是',
        false: '否',
      },
    },
    {
      title: '狀態',
      field: 'status',
      defaultSort: 'asc',
      cellStyle: (val, rowData) => ({
        color: rowData.status !== 0 ? 'black' : 'red',
      }),
      lookup: {
        9: '取消',
        1: '審核',
      },
      render(rowData) {
        return USER_STATUS_MAP[rowData.status]
      },
    },
    {
      title: '建立時間',
      field: 'create_time',
      editable: 'never',
    },
  ]

  const [tableData, setTableData] = useState([])
  const [refreshTable, setRefreshTable] = useState(false)

  useEffect(() => {
    fetchGroupUser(props.group_id).then((data) => {
      setTableData(data)
      setRefreshTable(false)
    })
  }, [refreshTable, props.group_id])

  return (
    <>
      <Container className="pt-5 pb-5">
        <Table
          columns={columns}
          data={tableData}
          isLoading={refreshTable}
          editable={{
            isEditable: (rowData) => rowData.status === 0,
            isDeletable: () => false,
            onRowUpdate: async (newData, oldData) => {
              const { user_name, password, email } = newData
              const create_by = getUserId(
                credential.user.email,
                credential.group.group_id
              )

              await updateUser(newData.user_id, {
                status: Number(newData.status),
              })
              await signUp({
                user_id: email,
                password: atob(password),
                user_name,
                group_id: credential.group.group_id,
                url: credential.group.url,
                create_by,
              })
              const index = oldData.tableData.id
              const newTableData = [...tableData]
              newTableData[index] = { ...newData }
              setTableData(newTableData)
            },
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
          title="帳號管理"
        />
      </Container>
    </>
  )
}

export default ManageUser
