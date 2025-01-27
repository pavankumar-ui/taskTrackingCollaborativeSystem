const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const crypto = require('crypto');



//common middleware to validate the token//
const validateJWT = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    const headers = req.headers || {};
    const token = headers.authorization;

    if (!token) {
        return res.status(400).json({ "message": 'Token not found' });
    }

    try {

        //first hash the token for db storage check//
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        //to check if the token is blacklisted or not//
        const blacklistedTokenCheck = await prisma.blacklistedToken.findFirst({
            where: {
                token: hashedToken
            }
        });

        if (blacklistedTokenCheck) {
            return res.status(401).json({ message: "Session destroyed! please login again" });
        }


        //verify the token//
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findFirst({ where: { id: decodedToken.id } });

        //if the token is invalid then return invalid//
        if (!user) return res.status(498).json({ "message": "Invalid Token" });
        //if the token is valid then add user to req object//

         //now register the user for notifications after successful authentication//
         const io = req.app.get("io");   
         io.emit('registerUser', user.id);

        req.user = user;
        next();
    }

    catch (error) {
        console.log("error in middleware",error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ "message": "Token Expired! please login again" });
        }
    }
}

module.exports = validateJWT;