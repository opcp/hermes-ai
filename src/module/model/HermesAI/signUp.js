import { ajax } from './ajax'
import { SCAPI_KEY_MAP } from '../../constants'

export function signUp({
  user_id,
  password,
  user_name,
  group_id,
  url,
  create_by,
}) {
  const data = {
    key: SCAPI_KEY_MAP[url],
    group_id,
    create_by,
    user_id,
    user_name,
    password,
    is_close: '1', // 1 是啟用，0 是關閉
  }
  return ajax(`${url}/scapi/v1/ai/user/create`, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  })
}
