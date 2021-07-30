/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 10:13:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-14 10:58:17
 */
const getters = {
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}

export default getters
