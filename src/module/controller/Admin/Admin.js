import credential from '../Credential/credential'
import { checkIsAdmin, setAdmin } from '../../model/database/admin'
import {
  insertOrderLog,
  updateOrder as updateOrderToDatabase,
} from '../../model/database/order'
import {
  fetchGroupAdministrator,
  updateGroup,
  updateUser,
} from '../../model/database/userAndGroup'
import { updateOrder as updateOrderToHermesAI } from '../../model/HermesAI/order'
import { signUp } from '../../model/HermesAI/signUp'
import { getUserId } from '../../util'

class Admin {
  constructor() {
    this.user_id = null
  }
  async enableOrder(order_id, pur_time, remark, group_id) {
    const { group } = credential
    const { group_id: admin_group_id, url: domain } = group || {}
    if (!admin_group_id || !domain || !this.user_id) {
      throw new Error('沒有登入')
    }
    await updateOrderToDatabase(order_id, {
      remark,
      status: 1,
      user_id: this.user_id,
    })
    await updateOrderToHermesAI(group_id, pur_time)
    await insertOrderLog(order_id, 0, 1, this.user_id)
  }
  async enableGroup(group_id, url) {
    if (!group_id) {
      throw new Error('沒給 group_id')
    } else if (!url) {
      throw new Error('沒給 url')
    }
    await updateGroup(group_id, {
      status: 1,
      url,
    })
    await this.enableGroupAdministrator(group_id, url)
  }
  async enableGroupAdministrator(group_id, url) {
    const user = await fetchGroupAdministrator(group_id)
    if (!user) {
      throw new Error('查無使用者')
    }
    const { user_id: uid, user_name, password, email } = user
    const create_by = getUserId(
      credential.user.email,
      credential.group.group_id
    )

    await signUp({
      user_id: email,
      password: atob(password),
      user_name,
      group_id,
      url,
      create_by,
    })
    await updateUser(uid, { status: 1 })
  }
  async checkIsAdmin(user_id) {
    return await checkIsAdmin(user_id)
  }
  async setAdmin(email, uid) {
    return await setAdmin(email, uid)
  }
}

const admin = new Admin()

export default admin
