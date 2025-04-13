const { constants } = require("../constants");

const errorhandler = (err,req,res,next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    const errorResponse = {
        title: "Server Error",
        message: err.message,

    }

    if(process.env.ENVIRONMENT == "dev"){
        errorResponse.stackTrace = err.stack
    }
    
    switch(statusCode){

        case constants.VALIDATION_ERROR:
            errorResponse.title = "Validation Error"
            res.json(errorResponse);
            break;
        case constants.UNAUTHORIZED:
            errorResponse.title = "unauthorized";
            res.json(errorResponse);
            break;

        case constants.FORBIDDEN:
            errorResponse.title = "Forbidden",
            res.json(errorResponse)
            break;
        case constants.NOT_FOUND:
        errorResponse.title = "Not Found"
        res.json(errorResponse)
        break;
        case constants.SERVER_ERROR:
            errorResponse.title = "Server Error"
            res.json(errorResponse)
            break
        default:
            res.json(errorResponse)
            console.log(errorResponse)

            
    }
    next()

}

module.exports = errorhandler