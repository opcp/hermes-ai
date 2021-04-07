import credential from '../Credential/credential'
import Decimal from 'decimal.js'
import {
  createOrder as createOrderAtHermesAI,
  fetchPurchaseRecord,
  fetchUseRecord,
} from '../../model/HermesAI/order'
import {
  createOrder as createOrderAtDatabase,
  insertOrderLog,
} from '../../model/database/order'

class Order {
  constructor() {
    this.purchaseRecord = []
    this.useRecord = []
  }
  async updateRecord() {
    await this.updatePurchaseRecord()
    await this.updateUseRecord()
  }
  async updatePurchaseRecord() {
    const { group } = credential
    const { group_id, url: domain } = group || {}
    this.purchaseRecord = await fetchPurchaseRecord(group_id, domain)
    return this.purchaseRecord
  }
  async updateUseRecord() {
    const { group } = credential
    const { group_id, url: domain } = group || {}
    this.useRecord = await fetchUseRecord(group_id, domain)
    return this.useRecord
  }
  getCurrPoint() {
    const pointBought = this.purchaseRecord.reduce(
      (a, x) => (x.is_remit === 'Y' ? a + x.pur_point : a),
      0
    )
    const pointUsed = this.useRecord.reduce(
      (a, x) => a + x.use_point_by_time,
      0
    )
    return new Decimal(pointUsed).add(pointBought).toFixed(2)
  }
  async purchase(pur_point, package_id, amount = 1) {
    const { group, user } = credential
    const { email: user_id } = user || {}
    const { group_id, url: domain } = group || {}
    const { order_id } = await createOrderAtDatabase(
      group_id,
      package_id,
      user_id,
      amount
    )
    await createOrderAtHermesAI(group_id, domain, pur_point)
    await insertOrderLog(order_id, null, 0, user_id)
  }
}

const order = new Order()

export default order
