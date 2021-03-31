import credential from "../Credential/credential"

const SCAPI_KEY = '1448e4369aae19695ec23bb213aef211'

export function singUp (user_id, password) {
    const {group} = credential
    const {url, group_id} = url
    const data = {
        key: SCAPI_KEY,
        group_id,
        create_by: 'entrance_sign_up',
        user_id,
        password,
        is_close: "0"
    }
    return fetch(url + 'scapi/v1/ai/user/create', {
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
}

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // 輸出成 json
  }