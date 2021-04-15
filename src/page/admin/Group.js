import React from 'react'
import { useState } from 'react'
import admin from '../../module/controller/Admin/Admin'
import { useEffect } from 'react'
import {
  Button,
  Container,
  Modal,
  Table as BootstrapTable,
} from 'react-bootstrap'
import ViewList from '@material-ui/icons/ViewList'
import Table from '../../components/Table'
import { URL_GROUP_MAP, USER_STATUS_MAP } from '../../module/constants'
import { fetchAllGroup } from '../../module/model/database/group'
import { AccountBox, Refresh } from '@material-ui/icons'
import { fetchGroupUser } from '../../module/model/database/userAndGroup'

function Group(prop) {
  const groupTableColumns = [
    { title: '編號', field: 'group_id', editable: 'never' },
    { title: '企業名稱', field: 'company_name', editable: 'never' },
    { title: '聯絡人名稱', field: 'contact_person_name', editable: 'never' },
    {
      title: '推薦人編號',
      field: 'ref_agent_id',
      editable: 'never',
      emptyValue: 'N/A',
      render(rowData) {
        return rowData.ref_agent_id
      },
    },
    {
      title: '系統',
      field: 'url',
      emptyValue: 'N/A',
      defaultSort: 'asc',
      cellStyle: (val, rowData) => ({
        color: rowData.url ? 'black' : 'red',
      }),
      editable(column, rowData) {
        return !Boolean(rowData.url)
      },
      lookup: URL_GROUP_MAP,
      customFilterAndSearch(term, rowData) {
        const lowerCaseTerm = term.toLowerCase()
        const { url = '' } = rowData
        const key = URL_GROUP_MAP[url] ?? ''
        return (
          (key && key.toLowerCase().indexOf(lowerCaseTerm) >= 0) ||
          (url && url.toLowerCase().indexOf(lowerCaseTerm) >= 0)
        )
      },
    },
    {
      title: '是否為代理商',
      field: 'is_agent',
      emptyValue: 'N/A',
      editable: 'never',
      lookup: {
        true: '是',
        false: '否',
      },
    },
  ]
  const userTableColumns = [
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
  const [groupTableData, setGroupTableData] = useState([])
  const [userTableData, setUserTableData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [isShowDetailModal, setShowDetailModal] = useState(false)
  const [isShowUserModal, setShowUserModal] = useState(false)
  const [detailRowData, setDetailRowData] = useState({})
  const [refreshGroupTable, setRefreshGroupTable] = useState(false)
  const [refreshUserTable, setRefreshUserTable] = useState(false)

  useEffect(() => {
    fetchAllGroup().then((data) => {
      setGroupTableData(data)
      setRefreshGroupTable(false)
    })
  }, [refreshGroupTable])

  useEffect(() => {
    if (selectedGroup) {
      fetchGroupUser(selectedGroup).then((data) => {
        setUserTableData(data)
        setRefreshUserTable(false)
      })
    }
  }, [selectedGroup])

  return (
    <Container>
      <Table
        columns={groupTableColumns}
        data={groupTableData}
        isLoading={refreshGroupTable}
        editable={{
          // isEditable: (rowData) => !rowData.url,
          isEditable: () => true,
          isDeletable: () => false,
          onRowUpdate: (newData, oldData) =>
            admin.enableGroup(newData.group_id, newData.url).then(() => {
              const index = oldData.tableData.id
              const newTableData = [...groupTableData]
              newTableData[index] = { ...newData, status: 1 }
              setGroupTableData(newTableData)
            }),
        }}
        actions={[
          {
            icon: ViewList,
            tooltip: 'show detail',
            onClick: (event, rowData) => {
              setDetailRowData(rowData)
              setShowDetailModal(true)
            },
          },
          {
            icon: AccountBox,
            tooltip: 'show user list',
            onClick: (event, rowData) => {
              setSelectedGroup(rowData.group_id)
              setRefreshUserTable(true)
              setShowUserModal(true)
            },
          },
          {
            icon: Refresh,
            tooltip: 'refresh table',
            isFreeAction: true,
            onClick: (event, rowData) => {
              setRefreshGroupTable(true)
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        title="企業管理"
      />
      <Modal show={isShowDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>企業詳細資料</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <BootstrapTable striped bordered>
            <tbody>
              <tr>
                <td>企業電話</td>
                <td>企業地址</td>
              </tr>
              <tr>
                <td>{detailRowData.company_tel}</td>
                <td>{detailRowData.company_address}</td>
              </tr>
              <tr>
                <td>聯絡人電話</td>
                <td>聯絡人信箱</td>
              </tr>
              <tr>
                <td>{detailRowData.contact_person_tel}</td>
                <td>{detailRowData.contact_person_email}</td>
              </tr>
              <tr>
                <td>稅籍編號</td>
                <td></td>
              </tr>
              <tr>
                <td>{detailRowData.tax_id}</td>
                <td></td>
              </tr>
              <tr>
                <td>建立時間</td>
                <td>修改時間</td>
              </tr>
              <tr>
                <td>{detailRowData.create_time}</td>
                <td>{detailRowData.modify_time}</td>
              </tr>
            </tbody>
          </BootstrapTable>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => setShowDetailModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="xl"
        show={isShowUserModal}
        onHide={() => setShowUserModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>帳號列表</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Table
            columns={userTableColumns}
            data={userTableData}
            isLoading={refreshUserTable}
            actions={[
              {
                icon: Refresh,
                tooltip: 'refresh table',
                isFreeAction: true,
                onClick: (event, rowData) => {
                  setRefreshUserTable(true)
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
            title=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => setShowUserModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Group
