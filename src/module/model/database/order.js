import { v4 as uuidv4 } from 'uuid'
import { getFormattedDateTime } from '../../util'

export async function fetchOrderByGroup(group_id) {
  if (!group_id) {
    throw new Error('沒給 group')
  }
  const conn = firebase.database()
  const ref = conn.ref('/order')
  const snapshot = await ref.orderByChild('group_id').equalTo(group_id).get()
  const value = snapshot.val()
  return Object.values(value)
}

export async function fetchOrderByStatus(status) {
  if (status === undefined) {
    throw new Error('沒給 status')
  }
  const conn = firebase.database()
  const ref = conn.ref('/order')
  const snapshot = await ref.orderByChild('status').equalTo(status).get()
  const value = snapshot.val()
  return value ? Object.values(value) : []
}

export async function createOrder(group_id, package_id, user_id, amount = 1) {
  const order_id = uuidv4()
  const now = getFormattedDateTime()
  const conn = firebase.database()
  const refStr = `/order/${order_id}`
  const ref = conn.ref(refStr)
  const order = {
    order_id,
    package_id,
    group_id,
    amount,
    status: 0,
    create_by: user_id,
    modify_by: user_id,
    create_time: now,
    modify_time: now,
  }

  await ref.set(order)
  return order
}

export async function updateOrder(order_id, option = {}) {
  const now = getFormattedDateTime()
  const conn = firebase.database()
  const refStr = `/order/${order_id}`
  const ref = conn.ref(refStr)
  const data = {
    modify_time: now,
    modify_by: option.user_id,
    status: option.status,
  }
  if (option.remark) {
    data.remark = option.remark
  }
  await ref.update(data)
}

export async function insertOrderLog(
  order_id,
  orig_status,
  chg_status,
  user_id
) {
  const now = getFormattedDateTime()
  const conn = firebase.database()
  const refStr = `/order_log`
  const ref = conn.ref(refStr)
  const data = {
    create_time: now,
    create_by: user_id,
    orig_status,
    chg_status,
    order_id,
  }
  return await ref.push(data)
}
