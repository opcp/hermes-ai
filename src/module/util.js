import dayjs from 'dayjs'

export const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss'
export function getFormattedDateTime() {
  return dayjs().format(DATE_TIME_FORMAT)
}
