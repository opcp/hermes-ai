import credential from "../Credential/credential"

const SCAPI_KEY = '1448e4369aae19695ec23bb213aef211'

export function singUp (user_id, password, user_name) {
    const {group} = credential
    const {url, group_id} = group
    const data = {
        key: SCAPI_KEY,
        group_id,
        create_by: 'entrance_sign_up',
        user_id,
        user_name,
        password,
        is_close: "1" // 1 是啟用，0 是關閉
    }
    return fetch(`${url}/scapi/v1/ai/user/create`, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
    })
}