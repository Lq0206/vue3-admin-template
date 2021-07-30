/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 10:17:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-06 18:25:51
 */
module.exports = {
  title: 'Vue-Admin-Template',

  /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
  showSettings: true,

  /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
  tagsView: true,

  /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
  fixedHeader: false,

  /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
  sidebarLogo: false,

  /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
  errorLog: 'production'
}

