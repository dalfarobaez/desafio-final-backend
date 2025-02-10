const express = require('express')
const morgan = require('morgan')
const APIRoutes = require('./routes/routes')
const cors = require('cors')
// const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

// middelwares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/',APIRoutes)

// app.use(errorMiddleware)

module.exports = app