function getAgentRefStr(agent_id) {
  return `/agent/${agent_id}`
}
export async function fetchAgent(agent_id) {
  try {
    const refStr = getAgentRefStr(agent_id)
    const ref = firebase.database().ref(refStr)
    const snapshot = await ref.get()
    const agent = snapshot.val()
    return agent
  } catch (error) {
    console.error('取得代理商資訊失敗', error.code, error.message)
  }
}
export async function checkIfAgentExist(agent_id) {
  const value = await fetchAgent(agent_id)
  return value !== null && value !== undefined
}
export async function createAgent(agent_id) {
  const conn = firebase.database()
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const refStr = getAgentRefStr(uid)
  const ref = conn.ref(refStr)
  const agent = {
    agent_id,
    create_time: now,
    modify_time: now,
  }

  await ref.set(agent)

  return agent
}
export async function updateAgent(agent_id, option = {}) {
  const conn = firebase.database()
  const refStr = getAgentRefStr(agent_id)
  const ref = conn.ref(refStr)
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const agent = {
    modify_time: now,
    ...option,
  }

  await ref.update(agent)

  const snapshot = await ref.get()
  const value = snapshot.val()

  return value
}
