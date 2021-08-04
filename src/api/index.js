/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-22 14:37:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 14:19:55
 */
import service from '@/utils/request'

/* get */

export function getReq(url, params) {
  return service({
    url,
    method: 'get',
    params
  })
}

/* post */

export function postReq(url, params) {
  return service({
    url,
    method: 'post',
    data: params
  })
}

/* put */

export function putReq(url, params) {
  return service({
    url,
    method: 'put',
    data: params
  })
}

/* delete */

export function deleteReq(url, params) {
  return service({
    url,
    method: 'delete',
    data: params
  })
}
