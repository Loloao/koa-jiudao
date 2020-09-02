const {HttpException} = require('../core/http-exceptions')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.mapGetters,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    ctx.body = '服务器有点问题，你等一下'
  }
}