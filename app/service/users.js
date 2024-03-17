const query = require('../utils/query')

class UserService {
  // 注册
  async insterUser({ username, password }) {
    // 查重
    const sql = `select *
								 from users
								 where username = '${username}'`
    const arrList = await query(sql)
    if (arrList.length > 0) return false
    // 插入
    const result = await query(`insert into users (username, password)
																values ('${username}', '${password}')`)
    // 反馈
    return result.affectedRows === 1
  }
  // 登录
  async findUser({ username, password }) {
    const sql = `select id, username from users where username = '${username}' and password = '${password}'`
    const users = await query(sql)
    return users.length ? users[0] : {}
  }
  // 用户信息
  async findUserInfo(userid) {
    const sql = `select * from users left join roles on users.rid = roles.id where users.id =${userid}`
    const users = await query(sql)
    if (users.length) {
      users[0].password = undefined
      return users[0]
    }
    return {}
  }
}

module.exports = new UserService()
