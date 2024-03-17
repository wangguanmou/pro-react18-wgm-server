const Router = require('koa-router')
const { prefix } = require('../config/config.default')
const middlewareTest = require('./middleware/test')

const { registry, login } = require('./controller/users')
const { list: studentsList } = require('./controller/students')

const router = new Router({ prefix })

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Koa'
})

// 注册
router.post('/registry', registry)

// 登录
router.post('/login', middlewareTest(), login)

// 学生列表
router.get('/students', studentsList)

module.exports = router
