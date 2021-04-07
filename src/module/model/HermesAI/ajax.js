export async function ajax(url, option) {
  try {
    const response = await fetch(url, option)
    const data = await response.json()
    if (data.type === 0) {
      return data.data
    } else {
      throw new Error(`type: ${data.type}, data: ${data.data.toString()}`)
    }
  } catch (error) {
    console.warn(error)
  }
}
