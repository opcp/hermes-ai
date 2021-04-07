export async function checkIsAdmin(user_id) {
  const conn = firebase.database()
  const ref = conn.ref('/admin')
  const snapshot = await ref.orderByValue().equalTo(user_id).get()
  const value = snapshot.val()
  return value !== null
}

export async function insertAdmin(user_id) {
  const conn = firebase.database()
  const ref = conn.ref('/admin')
  return await ref.push(user_id)
}
