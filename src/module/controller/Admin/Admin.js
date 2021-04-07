import credential from '../Credential/credential'
import { checkIsAdmin, insertAdmin } from '../../model/database/admin'
import {
  insertOrderLog,
  updateOrder as updateOrderToDatabase,
} from '../../model/database/order'
import { updateGroup } from '../../model/database/userAndGroup'
import { updateOrder as updateOrderToHermesAI } from '../../model/HermesAI/order'

class Admin {
  constructor() {
    this.user_id = null
  }
  async enableOrder(order_id, remark = '') {
    const { group } = credential
    const { group_id, url: domain } = group || {}
    if (!group_id || !domain || !this.user_id) {
      throw new Error('沒有登入')
    }
    await updateOrderToDatabase(order_id, {
      remark,
      status: 1,
      user_id: this.user_id,
    })
    await updateOrderToHermesAI(group_id, domain)
    await insertOrderLog(order_id, 0, 1, this.user_id)
  }
  async enableGroup(
    group_id,
    url = 'https://cloud.servtech.com.tw:59090/HermesAI'
  ) {
    await updateGroup(group_id, {
      status: 1,
      url,
    })
  }
  async checkIsAdmin(user_id) {
    return await checkIsAdmin(user_id)
  }
  async insertAdmin(user_id) {
    return await insertAdmin(user_id)
  }
}

const admin = new Admin()

export default admin
