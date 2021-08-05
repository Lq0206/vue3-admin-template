/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-08-04 10:34:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-05 17:16:02
 */
const Mock = require('mockjs')
import _ from 'lodash'
const Random = Mock.Random
/* token */
const tokens = {
  admin: {
    token: 'admin-token'
  },
  visitor: {
    token: 'visitor-token'
  }
}

/* user */
const users = {
  'admin-token': {
    roles: ['admin'],
    cname: 'Super Admin',
    avatar: '/assets/avatar.png',
    email: 'adminSuper@qq.com',
    phone: '8888666',
    areaCode: '010',
    cities: ['330000', '330100', '330108'],
    address: '光明大道222号',
    introduction: '人生最应珍惜的是时光。不要缩在曾经的阴影里，也别失落在未来的忧虑上。现在的努力和坚持才是明天的成绩。'
  },
  'visitor-token': {
    roles: ['visitor'],
    cname: Random.cname(),
    avatar: Random.dataImage('100x100'),
    email: Random.email(),
    phone: '8888666',
    areaCode: '+86',
    cities: ['330000', '330100', '330108'],
    address: '光明大道222号',
    introduction: '没有特别幸运，那么请先特别努力，别因为懒惰而失败，还矫情地将原因归于自己倒霉。你必须特别努力，才能显得毫不费力。'
  }
}

/* 用户登录信息 */
const reqLogin = (res) => {
  const { username } = JSON.parse(res.body)
  const token = tokens[username]

  if (!token) {
    return {
      code: 401,
      message: '用户账号或密码不正确'
    }
  }
  return {
    code: 200,
    data: token
  }
}

/* 用户信息 */
const reqUserInfo = (params) => {
  const { token } = JSON.parse(params.body)
  const info = users[token]
  if (!info) {
    return {
      code: 50008,
      message: '获取用户信息错误'
    }
  }

  return {
    code: 200,
    data: info
  }
  // const { token } = params
}

let tableData = []
export const initTableData = (len = 20) => {
  tableData = []
  for (let i = 0; i < len; i++) {
    tableData.push({
      id: `id_${i + 1}`,
      name: Random.cname(),
      date: Random.now('yyyy-MM-dd'),
      address: Random.county(true)
    })
  }
  return tableData
}

const reqProTableData = (params) => {
  const nParams = JSON.parse(params.body)
  if (_.isEmpty(nParams)) return
  const newData = []
  for (const item in nParams) {
    tableData.forEach(t => {
      if (t[item] === nParams[item]) {
        newData.push(t)
      }
    })
  }
  return {
    code: 200,
    data: newData
  }
}

Mock.mock('/user/login', 'post', reqLogin)
Mock.mock(RegExp('/user/userInfo'), 'post', reqUserInfo)
Mock.mock('/pro-table/data', 'post', reqProTableData)
