
const TokenExpiration = async (req,res,err,next)=>{

     if(err.name === "TokenExpiredError"){
         
        return res.status(401).json(
            {
                "error": "token has expired",
                "message": "please login again"
            });
        }
        next(err);
}

module.exports = TokenExpiration;