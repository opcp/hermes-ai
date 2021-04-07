export async function fetchPackage() {
  try {
    const refStr = '/package'
    const ref = firebase.database().ref(refStr)
    const snapshot = await ref.get()
    const packageData = snapshot.val()
    return packageData
  } catch (error) {
    console.error('取得點數方案失敗', error.code, error.message)
  }
}
