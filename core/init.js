const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore (app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api/v1`
    // requireDirectory 用于将对应文件夹下的内容导出
    // 第三个参数的 visit 属性就是一个在每次加载模块时的回调函数
    requireDirectory(module, apiDirectory, {visit: whenLoadModule})

    function whenLoadModule (obj) {
      // 当输出是一个 router 时就加入中间件
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager