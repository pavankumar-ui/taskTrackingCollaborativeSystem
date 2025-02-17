const { statusConfig } = require("../Config/statusConfig");

const TokenExpiration = async (req,res,err,next)=>{

     if(err.name === "TokenExpiredError"){
         
        return res.status(statusConfig.TOKEN_EXPIRED).json(
            {
                "error": "token has expired",
                "message": "please login again"
            });
        }
        next(err);
}

module.exports = TokenExpiration;