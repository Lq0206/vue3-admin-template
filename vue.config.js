/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-22 09:57:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 10:46:30
 */
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'

// const assetsCDN = {
//   externals: {
//     vue: 'vue',
//     'vue-router': 'vueRouter',
//     vuex: 'vuex',
//     axios: 'axios',
//     'nprogress': 'NProgress'
//   },
//   css: ['https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
//   js: [
//     'https://cdn.bootcdn.net/ajax/libs/vue/3.0.5/vue.cjs.prod.js',
//     'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.0/vue-router.cjs.prod.js',
//     'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.cjs.js',
//     'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js',
//     'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
//   ]
// }

// const vueConfig = {
//   publicPath: '/',
//   lintOnSave: undefined,
//   configureWebpack: config => {
//     if (isProd) {
//       /* gzip */
//       const productionGzipExtensions = ['html', 'js', 'css']
//       /* cdn */
//       config.externals = assetsCDN.externals
//       config.plugins.push(
//         new CompressionWebpackPlugin({
//           filename: '[path][base].gz',
//           algorithm: 'gzip',
//           test: new RegExp(
//             '\\.(' + productionGzipExtensions.join('|') + ')$'
//           ),
//           threshold: 10240, // 只有大小大于该值的资源会被处理 10240
//           minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
//           deleteOriginalAssets: false // 删除原文件
//         })
//       )
//     }
//     config.performance = {
//       hints: 'warning',
//       maxEntrypointSize: 50000000,
//       maxAssetSize: 30000000,
//       assetFilter: function(filename) {
//         return filename.endsWith('.js')
//       }
//     }
//     // externals:
//   },
//   chainWebpack: config => {
//     config.plugin('html').tap(args => {
//       // 生产环境或本地需要cdn时，才注入cdn
//       if (isProd) args[0].cdn = assetsCDN
//       return args
//     })
//   },
//   productionSourceMap: false,
//   transpileDependencies: []
// }

// module.exports = vueConfig
