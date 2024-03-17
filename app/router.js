const Router = require('koa-router')
const { prefix } = require('../config/config.default')
const middlewareTest = require('./middleware/test')

const { registry, login, getUserInfo } = require('./controller/users')
const { list: studentsList } = require('./controller/students')

const router = new Router({ prefix })

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Koa'
})

router.post('/registry', registry) // 注册
router.post('/login', middlewareTest(), login) // 登录
router.get('/userinfo', getUserInfo) // 登录

// 学生列表
router.get('/students', studentsList)

module.exports = router
