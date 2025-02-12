const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ServerError = require('../Utils/ServerError');
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const { statusConfig } = require('../Config/statusConfig');


const Signup = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    try {
        const { name, email, password, designation_role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        let user = await prisma.user.findFirst({ where: { email } });

        //if user is already present then return exists//
        if (user) return res.status(400).json({ "message": "User already exists" });

        //if user is new user then register a new user using prisma client//    
        user = await prisma.user.create({
            data: {
                name,
                email,
                designation_role,
                password: hashedPassword
            }
        });
        //By initial if he/she is manager or team leader,then he can give the designation role as 
        // manager or team leader, then he can have access to add the tasks/create the project to team members//
        return res.status(statusConfig.CREATED).json({
            "message": "user registered Successfully",
            user
        });
    }
    catch (error) {
        ServerError(error, req, res, next);
    }
}



const Signin = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    try {
        const { email, password } = req.body;

        const checkuser = await prisma.user.findFirst({ where: { email } });

        const matchedPassword = await bcrypt.compare(password, checkuser.password);

        //if user password is invalid then return false//
        if (!matchedPassword) return res.status(400).json({ "message": "Invalid Credentials" });

        //if user email and password is valid then generate token//
        const token = jwt.sign({
            id: checkuser.id,
            email: checkuser.email,
            designation_role: checkuser.designation_role
        },
            JWT_SECRET, { expiresIn: "1h" });

        //if user is logged in then emit the event to all the users//
        const io = req.app.get('io');
        const regtoEvents = io.emit('registerUser', checkuser.id);

        if (regtoEvents) {
            console.log("user registered for task notifications");
        }

        return res.status(statusConfig.SUCCESS).json({
            "message": "User Logged in successfully",
            "designation": checkuser.designation_role,
            token
        });
    }
    catch (error) {
        ServerError(error, req, res, next);
    }

}

const getProfileData = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    const user = await req.user;

    try {
        const userProfile = await prisma.user.findFirst({ where: { id: user.id } });

        return res.status(statusConfig.SUCCESS).json({
            "message": "User Profile data",
            userProfile
        });
    }
    catch (error) {
        ServerError(error, req, res, next);
    }
}

const modifyProfileData = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    try {

        const UserId = req.user.id;
        //console.log(UserId);


        //here in designation role, sde refers to an ordinary team member,
        // only if he is promoted to manager/team leader, then he can update the designation role to manager nor team leader// 
        const updateData = {};

        if (req.body.name) updateData.name = req.body.name;
        if (req.body.password) updateData.password = await bcrypt.hash(req.body.password, 12);
        if (req.body.email) updateData.email = req.body.email;
        if (req.body.phone) updateData.phone = req.body.phone.toString();
        if (req.body.designation_role) updateData.designation_role = req.body.designation_role;
        if (req.body.company_name) updateData.company_name = req.body.company_name;
        if (req.body.is_active) updateData.is_active = req.body.is_active;
        console.log(updateData);

        const updatedUser = await prisma.user.update({
            where: { id: UserId },
            data: updateData
        });
        //console.log(updatedUser);

        return res.status(statusConfig.SUCCESS).json({
            "message": "user Profile data updated Successfully",
            "updatedUserProfile": updatedUser
        })
    }
    catch (error) {
        ServerError(error, req, res, next);
    }
}


const logout = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    const token = req.headers.authorization;

    if (token === "") {
        return res.status(statusConfig.TOKEN_NOT_PROVIDED)
           .json({ message: "token is missing in the header" });
    }

    try {
        // First verify the token
        const decode = jwt.verify(token, JWT_SECRET);

        try {

            //calculate the token expiry time and store it in the database//
            const expiry_time = new Date(decode.exp * 1000).toISOString();

            //now hash the token before storing it in the database//
            const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

            const deleteTheToken = await prisma.blacklistedToken.deleteMany({
                where: {
                    expiry_time: {
                        lt: new Date()
                    }
                }
            });

            console.log(deleteTheToken);



            //insert token into blacklistedToken table //
            const blacklistedToken = await prisma.blacklistedToken.create({

                data: {
                    token: hashedToken,
                    expiry_time: expiry_time
                }
            });

            if (blacklistedToken) return res.status(statusConfig.SUCCESS)
                .json({ message: `user ${req.user.name} logged out successfully` });


        } catch (err) {
            //console.error("Error inserting token into blacklist:", err);
            return res.status(statusConfig.INTERNAL_SERVER_ERROR)
            .json({ message: "Database error" });
        }
    } catch (error) {
        //console.error("Token verification failed:", error.message);
        return res.status(statusConfig.INVALID_TOKEN).json({ message: "token is invalid!" });
    }
}
module.exports = {
    Signup,
    Signin,
    getProfileData,
    modifyProfileData,
    logout
}
