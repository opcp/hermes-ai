async function getOrderList() {
    try {
        const snapshot = await firebase.database().ref('/order')
        return snapshot.exists() ? snapshot.val() : []
    } catch (error) {
        console.error(error);
        return []
    }
}

export {
    getOrderList
}