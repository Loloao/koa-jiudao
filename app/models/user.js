const {sequelize} = require('../../core/db')

const {Sequelize, Model} = require('sequelize')

class User extends Model {

}

User.init({
  // 主键为一个关系型数据库，它绝对不能重复
  id: {
    type: Sequelize.INTEGER,
    // 设置 id 为主键
    primaryKey: true,
    // 自动增长 id 编号
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  // 这是小程序的 openid，由于可能有用户不是从小程序来的，则可能没有 openid
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  },
  test: Sequelize.STRING
}, {
  sequelize,
  tableName: 'user'
})