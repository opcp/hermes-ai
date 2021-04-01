import dayjs from "dayjs";

function getUserRefStr (uid) {
    return `/user/${uid}`
}
function getGroupRefStr (group_id) {
    return `/group/${group_id}`
}
export async function fetchUserAndGroup (uid) {
    const userRefStr = getUserRefStr(uid)
    const userRef = firebase.database().ref(userRefStr)
    const userSnapshot = await userRef.get()
    const user = userSnapshot.val()
    const {
        group_id
    } = user ?? {}
    if (group_id) {
        const groupRefStr = getGroupRefStr(group_id)
        const groupRef = firebase.database().ref(groupRefStr)
        const groupSnapshot = await groupRef.get()
        const group = groupSnapshot.val()
        Object.assign(user, {group})
    }
    return user
}
export async function checkIfGroupExist (group_id) {
    const refStr = getGroupRefStr(group_id)
    const conn = firebase.database()
    const ref = conn.ref(refStr)
    const snapshot = await ref.get()
    const value = snapshot.val()
    return value !== null
}
export async function createUserAndGroup (group_id, uid, option = {}) {
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
    } = option
    const group = {
        agent_id: group_id,
        url: "https://cloud.servtech.com.tw:59090/HermesAI", // TODO: 之後開放後台啟用帳戶就要拿掉
        create_time: now,
        modify_time: now,
        company_name,
        company_tel,
        company_address,
        contact_person_name,
        contact_person_tel,
        contact_person_email,
        ref_agent_id,
    }

    await groupRef.set(group)
    
    const user = await createUser(group_id, uid, user_name)

    return {
        group,
        user
    }
}
export async function createUser (group_id, uid, user_name) {
    const conn = firebase.database()
    const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
    const userRefStr = getUserRefStr(uid)
    const userRef = conn.ref(userRefStr)
    const user = {
        user_id: uid,
        user_name,
        group_id,
        create_time: now,
        modify_time: now,
    }
    
    await userRef.set(user)

    return user
}
export async function updateGroup (group_id, option = {}) {
    const conn = firebase.database()
    const groupRefStr = getGroupRefStr(group_id)
    const groupRef = conn.ref(groupRefStr)
    const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
    const group = {
        modify_time: now,
        ...option
    }

    await groupRef.update(group)

    const snapshot = await groupRef.get()
    const value = snapshot.val()

    return value
}