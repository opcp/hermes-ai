export async function fetchGroupByStatus(status) {
  if (status === undefined) {
    throw new Error('沒給 status')
  }
  const conn = firebase.database()
  const ref = conn.ref('/group')
  const snapshot = await ref.orderByChild('status').equalTo(status).get()
  const value = snapshot.val()
  return Object.values(value)
}
