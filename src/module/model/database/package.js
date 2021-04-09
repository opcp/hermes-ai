import * as yup from 'yup'
import { getFormattedDateTime } from '../../util'
import databaseCrud from './crud'

const rootRef = '/package'

export async function fetchPackage(isAvailable) {
  let packageData = []
  try {
    if (isAvailable === undefined) {
      packageData = await databaseCrud.read(rootRef)
    } else {
      packageData = await databaseCrud.filterByChildProp(
        rootRef,
        'status',
        Number(isAvailable)
      )
    }
  } catch (error) {
    console.warn('取得點數方案失敗', error.code, error.message)
  }
  return packageData
}

const packageOptionSchema = yup.object().shape({
  create_time: yup.string().required(),
  package_id: yup.string().required(),
  points: yup.number().required(),
  price: yup.number().required(),
})
export async function createPackage(option) {
  await packageOptionSchema.validate(option)
  const now = getFormattedDateTime()
  const data = {
    create_time: now,
    package_id: option.package_id,
    package_name: option.package_name ?? '',
    remark: option.remark ?? '',
    points: option.points,
    price: option.price,
    status: 0,
  }
  try {
    await databaseCrud.create(rootRef, data)
    return data
  } catch (error) {
    console.warn('建立點數方案失敗', error.code, error.message)
  }
}

export async function updatePackage(option) {
  try {
    const refStr = `${rootRef}/${option.package_id}`
    await databaseCrud.update(refStr, option)
    return true
  } catch (error) {
    console.warn('更新點數方案失敗', error.code, error.message)
  }
}
