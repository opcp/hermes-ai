export async function fetchGroupByStatus(status) {
  if (status === undefined) {
    throw new Error('沒給 status')
  }
  const conn = firebase.database()
  const ref = conn.ref('/group')
  const snapshot = await ref.orderByChild('status').equalTo(status).get()
  const value = snapshot.val()
  return value ? Object.values(value) : []
}

export async function fetchAllGroup() {
  const conn = firebase.database()
  const ref = conn.ref('/group')
  const snapshot = await ref.get()
  const value = snapshot.val()
  return value ? Object.values(value) : []
}
