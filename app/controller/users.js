const query = require('../utils/query')
const { sign } = require('../utils/jwt')
const { findUser, insterUser } = require('../service/users')

class UserController {
  async registry(ctx, next) {
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

  async login(ctx) {
    // 参数
    const { username, password } = ctx.request.body

    // 参数校验
    ctx.verifyParams({
      username: 'string',
      password: { type: 'string', required: true },
      /* 举个栗子 https://github.com/node-modules/parameter/blob/master/example.js */
      // name: 'string',
      // age: {type: 'int', max: 200, message: { max: '年龄不能大于 200 岁' }},
      // gender: ['male', 'female'],
      // working: 'boolean',
      // salary: {type: 'number', min: 0},
      // birthday: 'date',
      // now: 'dateTime',
      // id: 'id',
      // childrens: {
      // 	type: 'array',
      // 	itemType: 'object',
      // 	required: false,
      // 	rule: {
      // 		name: 'string',
      // 		age: { type: 'int', message: { required: '子女年龄不能为空' }},
      // 		gender: ['male', 'female'],
      // 		birthday: {type: 'date', required: false}
      // 	}
      // },
      // mate: {
      // 	type: 'object',
      // 	required: false,
      // 	rule: {
      // 		name: 'string',
      // 		age: 'int',
      // 		gender: ['male', 'female'],
      // 		birthday: {type: 'date', required: false}
      // 	}
      // }
    })

    const user = await findUser({ username, password })

    // 反馈
    if (user.id) {
      const token = sign({ id: user.id })
      ctx.cookies.set('token', token, { httpOnly: true })
      ctx.body = {
        code: 200,
        msg: '登录成功',
        data: token,
      }
    } else {
      ctx.status = 400
      ctx.body = {
        code: 400,
        msg: '登录失败',
      }
    }
  }
}

module.exports = new UserController()
