/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-08-04 10:34:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 15:15:16
 */
const Mock = require('mockjs')
const Random = Mock.Random
const tokens = {
  admin: {
    token: 'admin-token'
  },
  visitor: {
    token: 'visitor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    name: 'Super Admin',
    avatar: '../../assets/avatar.png',
    email: 'adminSuper@qq.com',
    phone: '8888666'
  },
  'visitor-token': {
    roles: ['visitor'],
    name: Random.cname(),
    avatar: '../../assets/avatar.png',
    email: 'visitor@qq.com',
    phone: '8888666'
  }
}

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

Mock.mock('/user/login', 'post', reqLogin)
Mock.mock(RegExp('/user/userInfo'), 'post', reqUserInfo)
