import admin from '../Admin/Admin'
import { checkIsAdmin } from '../../model/database/admin'
import {
  checkIfGroupExist,
  createUser,
  createUserAndGroup,
  fetchUserAndGroup,
} from '../../model/database/userAndGroup'
import { singUp as singUpToHermesAI } from '../../model/HermesAI/signUp'

class Credential {
  constructor() {
    this.user = null
    this.group = null
  }
  async signIn(email, password) {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    const { user } = userCredential

    const { user_name, group } = await fetchUserAndGroup(user.uid)

    this.user = Object.assign(user, { user_name, pw: btoa(password) })
    this.group = group
    return this
  }
  async signInAsAdmin(email, password) {
    const isAdmin = await checkIsAdmin(email)
    if (!isAdmin) {
      throw new Error('非系統管理員，不得登入')
    }
    await this.signIn(email, password)
    admin.user_id = email
  }
  async signOut() {
    await firebase.auth().signOut()
    this.user = null
    this.group = null
    admin.user_id = null
  }
  async signUp(email, password, option = {}) {
    const { group_id, isAdmin, user_name } = option
    const isGroupExist = await checkIfGroupExist(group_id)
    if (isAdmin && isGroupExist) {
      throw {
        code: 'c-1',
        message: '此 group_id 已經被使用了：' + group_id,
      }
    } else if (!isAdmin && !isGroupExist) {
      throw {
        code: 'c-2',
        message: '查無此 group 資料：' + group_id,
      }
    }
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    const { user } = userCredential
    this.user = user
    this.user.user_name = user_name
    this.user.pw = btoa(password)

    if (isAdmin) {
      const { group } = await createUserAndGroup(group_id, user.uid, option)
      this.group = group
    } else {
      await createUser(group_id, user.uid, user_name)
      const { group } = await fetchUserAndGroup(user.uid)
      this.group = group
    }
    await singUpToHermesAI(email, password, user_name)
    return this
  }
  async toHermesAI() {
    if (!this.group || !this.user) {
      throw new Error('沒有登入')
    }
    const { url, group_id } = this.group
    const { email: user_id, pw } = this.user
    const time = new Date().getTime()
    const fullUrl = `${url}/login.html?id=${btoa(
      group_id + '_' + user_id
    )}&pw=${pw}&time=${btoa(time)}`
    window.open(fullUrl)
  }
  async updateGroup() {
    const { group } = await fetchUserAndGroup(this.user.uid)
    this.group = group
  }
}
const credential = new Credential()

export default credential
