const { LinValidator, Rule } = require("../../core/lin-validator");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 第一个参数是规则，第二个是提示文本，第三个是可选参数
      new Rule('isInt', '需要是正整数', {min: 1})
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合 Email 规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      }),
    ]
  }

  // 当使用 validate 开头时就会自动进行校验
  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}