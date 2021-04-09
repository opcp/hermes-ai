const rootRefSet = new Set([
  'package',
  'admin',
  'agent',
  'group',
  'user',
  'order',
  'order_log',
])
class DatabaseCrud {
  constructor(rootRefSet) {
    this.rootRefSet = rootRefSet
  }
  getConn() {
    return firebase.database()
  }
  create() {}
  async read(ref) {
    const conn = this.getConn()
    const snapshot = await conn.ref(ref).get()
    return snapshot.val()
  }
  async filterByChildProp(ref, key, value) {
    const conn = this.getConn()
    const snapshot = await conn.ref(ref).orderByChild(key).equalTo(value).get()
    return snapshot.val()
  }
  update() {}
  delete() {}
}

const databaseCrud = new DatabaseCrud(rootRefSet)

export default databaseCrud
