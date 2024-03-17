const mysql = require('mysql2')
const {
  mysql: { client },
} = require('../../config/config.default.js')

const connection = mysql.createConnection({ ...client })

connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log(`mysql is done!`)
})

module.exports = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (error, results) {
      if (error) {
        reject(error)
        return
      }
      resolve(results)
    })
  })
}
