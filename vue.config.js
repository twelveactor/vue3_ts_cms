// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

const path = require('path')
module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: './build',
  // 这个部署到服务器需要注释掉
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },


  //   // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  //   configureWebpack: {
  //     resolve: {
  //       alias: {
  //         components: '@/components'
  //       }
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三:链式编程
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  },
  // 第二种方式：官网推荐 element plus 按需导入使用
  configureWebpack: (config) => {
    // Element-plus 按需引入配置
    config.plugins.push(
      AutoImport({
        resolvers: [ElementPlusResolver()]
      })
    )
    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver()]
      })
    )
  }

}
