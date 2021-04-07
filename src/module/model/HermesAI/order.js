import dayjs from 'dayjs'
import { SCAPI_KEY } from '../../constants'
import credential from '../../controller/Credential/credential'
import { ajax } from './ajax'

export async function fetchPurchaseRecord(group_id, domain) {
  if (!group_id || !domain) {
    return []
  }
  const url = `${domain}/scapi/v1/ai/get-purchase-record?group_id=${group_id}&key=${SCAPI_KEY}`
  const response = await ajax(url)
  return response
}
export async function fetchUseRecord(group_id, domain) {
  if (!group_id || !domain) {
    return []
  }
  const url = `${domain}/scapi/v1/ai/get-point-record?group_id=${group_id}&key=${SCAPI_KEY}`
  const response = await ajax(url)
  return response
}
export async function createOrder(group_id, domain, pur_point) {
  if (!group_id) {
    throw new Error('沒有給 group')
  } else if (!domain) {
    throw new Error('沒有給 domain')
  } else if (!credential.user) {
    throw new Error('沒有登入')
  }
  const url = `${domain}/scapi/v1/ai/purchase-record`
  const requestParam = {
    key: SCAPI_KEY,
    group_id,
    pur_point,
    pur_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    pur_by: credential.user.user_id,
    is_remit: 'N',
  }
  const response = await ajax(url, {
    body: JSON.stringify(requestParam),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
  })
  return response
}
export async function updateOrder(group_id, domain, option = {}) {
  if (!group_id) {
    throw new Error('沒有給 group')
  } else if (!domain) {
    throw new Error('沒有給 domain')
  }
  const url = `${domain}/scapi/v1/ai/purchase-record`
  const requestParam = {
    key: SCAPI_KEY,
    group_id,
    pur_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    is_remit: 'Y',
    ...option,
  }
  const response = await ajax(url, {
    body: JSON.stringify(requestParam),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
  })
  return response
}
