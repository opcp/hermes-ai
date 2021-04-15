import admin from '../Admin/Admin'
import { checkIsAdmin } from '../../model/database/admin'
import {
  checkIfGroupExist,
  createUser,
  createUserAndGroup,
  fetchUserAndGroup,
} from '../../model/database/userAndGroup'
import _ from 'lodash'
import { getUserId } from '../../util'

class Credential {
  constructor() {
    this.user = null
    this.group = null
    this.eventHandlers = {
      authChange: {
        always: [],
        once: [],
      },
    }
    firebase.auth().onAuthStateChanged(async (user) => {
      await Promise.all(
        this.eventHandlers.authChange.always.map((fn) => fn(user))
      )
      await Promise.all(
        this.eventHandlers.authChange.once.map((fn) => fn(user))
      )
      this.eventHandlers.authChange.once.forEach((fn) =>
        this.off('authChange', fn)
      )
    })
  }
  once(type, callback) {
    if (!_.has(this.eventHandlers, type)) {
      throw new Error('錯誤的事件類型')
    } else if (!_.isFunction(callback)) {
      throw new Error('callback 必須是函式')
    }
    this.eventHandlers[type].once.push(callback)
  }
  on(type, callback) {
    if (!_.has(this.eventHandlers, type)) {
      throw new Error('錯誤的事件類型')
    } else if (!_.isFunction(callback)) {
      throw new Error('callback 必須是函式')
    }
    this.eventHandlers[type].always.push(callback)
  }
  off(type, callback, isOnce) {
    if (!_.has(this.eventHandlers, type)) {
      throw new Error('錯誤的事件類型')
    }

    const onceOrAlways = isOnce ? 'once' : 'always'
    if (
      _.isFunction(callback) &&
      this.eventHandlers[type][onceOrAlways].includes(callback)
    ) {
      const index = this.eventHandlers[type][onceOrAlways].findIndex(callback)
      this.eventHandlers[type][onceOrAlways].splice(index, 1)
    } else {
      this.eventHandlers[type][onceOrAlways].length = 0
    }
  }
  async init() {
    const user = firebase.auth().currentUser
    if (user && this.user?.uid !== user.uid) {
      this.user = user
      const isAdmin = await checkIsAdmin(user.email)
      admin.user_id = isAdmin ? user.email : null
      await this.updateGroup()
    } else if (!user) {
      this.user = null
      this.group = null
    }
  }
  async signIn(email, password) {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    const { user } = userCredential

    const {
      user_name,
      group,
      is_group_admin = false,
      status,
    } = await fetchUserAndGroup(user.uid)

    this.user = Object.assign(user, {
      user_name,
      pw: btoa(password),
      is_group_admin,
      status,
    })
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
      throw new Error('此 group_id 已經被使用了：' + group_id)
    } else if (!isAdmin && !isGroupExist) {
      throw new Error('查無此 group 資料：' + group_id)
    }
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    const { user } = userCredential
    const encodedPassword = btoa(password)

    this.user = user
    this.user.user_name = user_name
    this.user.pw = encodedPassword
    this.user.status = 0
    this.user.is_group_admin = isAdmin

    if (isAdmin) {
      const { group } = await createUserAndGroup(group_id, user.uid, {
        password: encodedPassword,
        email,
        ...option,
      })
      this.group = group
    } else {
      await createUser(group_id, user.uid, user_name, encodedPassword, email)
      const { group } = await fetchUserAndGroup(user.uid)
      this.group = group
    }
    return this
  }
  toHermesAI() {
    if (!this.group || !this.user) {
      throw new Error('沒有登入')
    }
    const { url, group_id } = this.group
    const { email, pw } = this.user
    const user_id = getUserId(email, group_id)
    const time = new Date().getTime()
    const fullUrl = `${url}/login.html?id=${btoa(user_id)}&pw=${pw}&time=${btoa(
      time
    )}`
    window.open(fullUrl)
  }
  async updateGroup() {
    const {
      group,
      user_name,
      password,
      status,
      is_group_admin,
    } = await fetchUserAndGroup(this.user.uid)
    this.group = group
    this.user.user_name = user_name
    this.user.pw = password
    this.user.status = status
    this.user.is_group_admin = is_group_admin
  }
}
const credential = new Credential()

export default credential
