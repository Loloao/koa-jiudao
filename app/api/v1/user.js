const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/validator')

const router = new Router({
  prefix: '/v1/user'
})

// 注册，更新用 put，获取数据用 get，删除数据用 delete

router.post('/v1/user/register', async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router