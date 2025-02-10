const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

const hashPassword = (password) => {
  return bcrypt.hashSync(password,salt)
}

const verifyPassword = (password,hashed) => {
  return bcrypt.compareSync(password,hashed)
}

module.exports = {
  hashPassword,
  verifyPassword
}