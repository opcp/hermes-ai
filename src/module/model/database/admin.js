export async function checkIsAdmin(data, type = 'email') {
  const conn = firebase.database()
  let ref
  let snapshot
  switch (type) {
    case 'uid':
      ref = conn.ref('/admin/' + data)
      snapshot = await ref.get()
      break
    case 'email':
    default:
      ref = conn.ref('/admin')
      snapshot = await ref.orderByValue().equalTo(data).get()
      break
  }
  return snapshot.exists()
}

export async function setAdmin(email, uid) {
  const conn = firebase.database()
  const ref = conn.ref(`/admin/${uid}`)
  return await ref.set(email)
}
