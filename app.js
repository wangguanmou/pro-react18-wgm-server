const Koa = require('koa')
const app = new Koa()
const router = require('./app/router.js')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const RateLimit = require('koa2-ratelimit').RateLimit
const logger = require('koa-logger')
const auth = require('./app/middleware/auth.js') // 自定义全局鉴权中间件
const {
  auth: { whitelist },
} = require('./config/config.default.js')

function formatError(err) {
  return {
    code: err.status || err.statusCode || 500,
    msg: err.message,
    success: false,
    reason: 'Unexpected',
    data: { ...err },
  }
}

RateLimit.defaultOptions({
  code: 400,
})

app
  .use(error(formatError))
  .use(
    RateLimit.middleware({
      interval: { min: 1 }, // 15 minutes = 15*60*1000
      max: 1000, // limit each IP to 100 requests per interval
    }),
  )
  .use(logger())
  .use(serve(__dirname + '/app/static')) // http://localhost:3000/a.png
  .use(auth({ whitelist }))
  .use(parameter(app))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods()) // 将返回405 Method Not Allowed的状态码
  .listen(3000, () => {
    console.log('http://localhost:3000')
  })
