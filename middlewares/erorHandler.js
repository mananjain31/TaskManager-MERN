const { CustomError } = require("../errors/CustomError");

const errorHandler = (error, req, res, next) => {
    if(error instanceof CustomError) {
        return res.status(error.statusCode).json({error});
    }
    res.status(500).json({error});
}

module.exports = errorHandler