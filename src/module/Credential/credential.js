import {checkIfGroupExist, createUser, createUserAndGroup, fetchUserAndGroup} from '../database/userAndGroup'
import { singUp } from '../HermesAI/signUp'

class Credential {
    constructor() {
        this.user = null
        this.group = null
    }
    async signIn(email, password) {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
        const {
            user
        } = userCredential
        
        const userAndGroup = await fetchUserAndGroup(user.uid)

        this.user = user
        this.group = userAndGroup.group
        return this
    }
    async signOut() {
        await firebase.auth().signOut()
        this.user = null
        this.group = null
    }
    async signUp(email, password, option = {}) {
        const {
            group_id,
            isAdmin
        } = option
        const isGroupExist = await checkIfGroupExist(group_id)
        if (isAdmin && isGroupExist) {
            throw {
                code: 'c-1',
                message: '此 group_id 已經被使用了：' + group_id
            }
        } else if (!isAdmin && !isGroupExist) {
            throw {
                code: 'c-2',
                message: '查無此 group 資料：' + group_id
            }
        }
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const {
            user
        } = userCredential
        this.user = user

        if (isAdmin) {
            const {
                group
            } = await createUserAndGroup(group_id, user.uid, option)
            this.group = group
        } else {
            await createUser(group_id, user.uid)
            const {group} = await fetchUserAndGroup(user.uid)
            this.group = group
        }
        await singUp(email, password)
        return this
    }
    async toHermesAI () {
        const {url} = this.group
        window.open(url)
    }
}
const credential = new Credential()

export default credential