/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 14:45:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-01 10:17:25
 */
import defaultSettings from '@/config/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
