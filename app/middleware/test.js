/**
 * 自定义中间件导出一个函数, 返回一个函数
 * 这样做有利于参数拓展,
 * 因为返回的函数必须是一个带有固定行参 ctx、next 的函数
 * 所以在导出的函数中可以传入一些配置信息, 以实现更复杂的逻辑
 */
module.exports = ({ message } = { message: '我是一个插在登录路由中的 Middleware ^_^~' }) => {
  return async (ctx, next) => {
    console.log(message)
    await next()
  }
}
