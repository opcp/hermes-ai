import dayjs from 'dayjs'

function getUserRefStr(uid) {
  return `/user/${uid}`
}
function getGroupRefStr(group_id) {
  return `/group/${group_id}`
}
export async function fetchUserAndGroup(uid) {
  const userRefStr = getUserRefStr(uid)
  const userRef = firebase.database().ref(userRefStr)
  const userSnapshot = await userRef.get()
  const user = userSnapshot.val()
  const { group_id } = user ?? {}
  if (group_id) {
    const groupRefStr = getGroupRefStr(group_id)
    const groupRef = firebase.database().ref(groupRefStr)
    const groupSnapshot = await groupRef.get()
    const group = groupSnapshot.val()
    Object.assign(user, { group })
  }
  return user
}
export async function fetchGroupUser(group_id) {
  if (!group_id) {
    throw new Error('沒給 group_id')
  }
  const conn = firebase.database()
  const ref = conn.ref('/user')
  const snapshot = await ref.orderByChild('group_id').equalTo(group_id).get()
  const value = snapshot.val()
  return value ? Object.values(value) : []
}
export async function fetchGroupAdministrator(group_id) {
  const refStr = '/user'
  const ref = firebase
    .database()
    .ref(refStr)
    .orderByChild('group_id')
    .equalTo(group_id)
  const snapshot = await ref.get()
  const user = snapshot.val()
  return user
    ? Object.values(user).find(({ is_group_admin }) => is_group_admin)
    : null
}
export async function checkIfGroupExist(group_id) {
  const refStr = getGroupRefStr(group_id)
  const conn = firebase.database()
  const ref = conn.ref(refStr)
  const snapshot = await ref.get()
  const value = snapshot.val()
  return value !== null
}
export async function createUserAndGroup(group_id, uid, option = {}) {
  const conn = firebase.database()
  const groupRefStr = getGroupRefStr(group_id)
  const groupRef = conn.ref(groupRefStr)
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const {
    user_name,
    company_name,
    company_tel,
    company_address,
    contact_person_name,
    contact_person_tel,
    contact_person_email,
    ref_agent_id,
    tax_id,
    email,
  } = option
  const group = {
    group_id,
    agent_id: group_id,
    create_time: now,
    modify_time: now,
    company_name,
    company_tel,
    company_address,
    contact_person_name,
    contact_person_tel,
    contact_person_email,
    ref_agent_id,
    tax_id,
    status: 0,
  }

  await groupRef.set(group)

  const user = await createUser(
    group_id,
    uid,
    user_name,
    option.password,
    email,
    true
  )

  return {
    group,
    user,
  }
}
export async function createUser(
  group_id,
  uid,
  user_name,
  encodedPassword,
  email,
  is_group_admin = false
) {
  const conn = firebase.database()
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const userRefStr = getUserRefStr(uid)
  const userRef = conn.ref(userRefStr)
  const user = {
    user_id: uid,
    user_name,
    email,
    status: 0,
    is_group_admin,
    group_id,
    create_time: now,
    modify_time: now,
    password: encodedPassword,
  }

  await userRef.set(user)

  return user
}
export async function updateGroup(group_id, option = {}) {
  const conn = firebase.database()
  const groupRefStr = getGroupRefStr(group_id)
  const groupRef = conn.ref(groupRefStr)
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const group = {
    modify_time: now,
    ...option,
  }

  await groupRef.update(group)

  const snapshot = await groupRef.get()
  const value = snapshot.val()

  return value
}
export async function updateUser(uid, option = {}) {
  const conn = firebase.database()
  const refStr = getUserRefStr(uid)
  const ref = conn.ref(refStr)
  const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
  const data = {
    modify_time: now,
    ...option,
  }

  await ref.update(data)

  const snapshot = await ref.get()
  const value = snapshot.val()

  return value
}
