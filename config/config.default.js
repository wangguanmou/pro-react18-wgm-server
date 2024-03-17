module.exports = {
  prefix: '/api',
  auth: {
    whitelist: ['/registry', '/login', '/login-gitee', '/svg'],
  },
  mysql: {
    client: {
      host: 'localhost', // host
      port: '3306', // 端口号
      user: 'root', // 用户名
      password: 'root', // 密码
      database: 'wgm', // 数据库名
    },
  },
}
