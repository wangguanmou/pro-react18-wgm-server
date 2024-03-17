const jwt = require("jsonwebtoken");
const privateKey = "183974132413a09sdf8a0d8f@$FASFA)*()..23";

module.exports = {
  // 加密, login 接口会用到
  // 3600是1小时
  sign({ id }, opts = { expiresIn: 3600 * 2 }) {
    return jwt.sign({ id }, privateKey, opts);
  },
  // 解密, 以项目所有接口都加上解密校验, 并通过白名单过滤
  verify(token = "") {
    try {
      return jwt.verify(token, privateKey);
    } catch (error) {
      console.error("token失效-----", error);
      return false;
    }
  },
};
