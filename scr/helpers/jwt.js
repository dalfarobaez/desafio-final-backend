require('dotenv').config()
const jwt = require("jsonwebtoken")

const {JWT_SECRET} = process.env

const signToken = (data) => {
  return jwt.sign(data,String(JWT_SECRET))
}

const verifyToken = (token) => {
  return jwt.verify(token,String(JWT_SECRET))
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

module.exports = {
  signToken,
  verifyToken,
  decodeToken
}