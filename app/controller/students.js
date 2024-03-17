const query = require('../utils/query')

const list = async (ctx) => {
  const { currentPage, pageSize } = ctx.query

  // 分页查询
  const sql = `select *
               from students limit ${pageSize}
               offset ${(currentPage - 1) * pageSize} `
  const arrList = await query(sql)

  const sqlTotal = `select count(id) as total
                    from students`
  const [{ total }] = await query(sqlTotal)
  console.log(total)

  ctx.body = {
    code: 200,
    msg: '学生列表',
    data: {
      list: arrList,
      currentPage,
      pageSize,
      total,
    },
  }
}

module.exports = {
  list,
}
