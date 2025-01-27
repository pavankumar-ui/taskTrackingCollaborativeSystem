
const ServerError = (error,req,res,next)=>{
     console.log(error);
     if(error && !res.headersSent){
    return res.status(500).json({
        message:"Internal Server Error"
    });
}
    next(error);
    
}

module.exports = ServerError;