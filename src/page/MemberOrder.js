import React from 'react'
import MaterialTable from 'material-table'
import credential from '../module/controller/Credential/credential'
import { useHistory } from 'react-router'

function MemberOrder(prop) {
  const history = useHistory()
  if (!credential.user) {
    history.push('/')
    return null
  }

  return (
    <>
      <section className="memberContainer">
        <div className="memberBody">
          <h2>會員訂單</h2>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              icons={prop.icon}
              columns={[
                { title: '訂單', field: 'ID' },
                { title: '方案', field: 'plan' },
                { title: '數量', field: 'point' },
                { title: '狀態', field: 'status' },
                { title: '訂單時間', field: 'createTime', type: 'datetime' },
              ]}
              data={[
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
                {
                  ID: 'order_1',
                  plan: 'prime',
                  point: 20,
                  status: 63,
                  createTime: '2021/03/29 14:00:32',
                },
                {
                  ID: 'order_2',
                  plan: 'normal',
                  point: 15,
                  status: 90,
                  createTime: '2021/03/30 09:00:32',
                },
              ]}
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

export default MemberOrder
