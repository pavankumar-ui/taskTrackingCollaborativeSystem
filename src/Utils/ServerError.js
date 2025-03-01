const {statusConfig} = require("../Config/statusConfig");

const ServerError = (error,req,res,next)=>{
     if(error && !res.headersSent){
    return res.status(statusConfig.INTERNAL_SERVER_ERROR).json({
        message:"Internal Server Error"
    });
}
    next(error);
    
}

module.exports = ServerError;