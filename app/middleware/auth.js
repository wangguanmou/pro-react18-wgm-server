const { verify } = require('../utils/jwt')
const { prefix } = require('../../config/config.default')

/**
 * 自定义中间件导出一个函数, 返回一个函数
 * 这样做有利于参数拓展,
 * 因为返回的函数必须是一个带有固定行参 ctx、next 的函数
 * 所以在导出的函数中可以传入一些配置信息, 以实现更复杂的逻辑
 */
module.exports = ({ whitelist }) => {
  const prefixWhitelist = Array.from(whitelist, (path) => prefix + path)
  return async (ctx, next) => {
    const { id } = verify(ctx.request.headers.token)
    if (
      prefixWhitelist.includes(ctx.request.path) || // 先写, 白名单过滤
      id // 再写, token校验
    ) {
      ctx.userid = id
      await next()
    } else {
      ctx.body = {
        code: 401,
        msg: 'token失效, 请重新登录',
      }
    }
  }
}
