const errors = require('../helpers/errorMessages')

const errorMiddleware = (err,req,res,next) => {
    console.error(err,'Error desde middleware')

    const errorDetails = errors[err] || errors['server_error']

    const response = {
        id:errorDetails.id,
        message:errorDetails.message
    }
    res.status(errorDetails.statuscode).json(response)
}

module.exports = errorMiddleware