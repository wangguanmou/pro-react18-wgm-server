const { sign } = require('../utils/jwt')
const { findUser, insterUser, findUserInfo } = require('../service/users')

class UserController {
  async registry(ctx, next) {
    // 参数
    const { username, password } = ctx.request.body
    // 查询
    const result = await insterUser({ username, password })
    // 反馈
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
      }
    } else {
      ctx.status = 400
      ctx.body = {
        code: 400,
        msg: '注册失败',
      }
    }
  }

  async login(ctx) {
    // 参数
    const { username, password } = ctx.request.body

    // 校验
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

    // 查询
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

  async getUserInfo(ctx) {
    // 参数
    const { userid } = ctx
    // 查询
    const userinfo = await findUserInfo(userid)
    // 反馈
    if (userinfo.id) {
      ctx.body = {
        code: 200,
        msg: '获取用户信息成功',
        data: userinfo,
      }
    } else {
      ctx.status = 400
      ctx.body = {
        code: 400,
        msg: '获取用户信息失败',
      }
    }
  }
}

module.exports = new UserController()
