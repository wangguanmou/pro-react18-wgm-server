const query = require('../utils/query')

class UserService {
  async insterUser() {
    // 拿到参数
    const { username, password } = ctx.request.body
    // 查重
    const sql = `select *
								 from users
								 where username = '${username}'`
    const arrList = await query(sql)
    if (arrList.length > 0) {
      ctx.body = {
        code: 400,
        msg: '用户名存在',
      }
      return
    }
    // 插入
    const result = await query(`insert into users (username, password)
																values ('${username}', '${password}')`)
    // console.log(`result----`, result)
    // 反馈
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '写入用户注册信息失败',
      }
    }
  }

  async findUser({ username, password }) {
    const sql = `select id, username from users where username = '${username}' and password = '${password}'`
    const users = await query(sql)
    return users.length ? users[0] : {}
  }
}

module.exports = new UserService()
