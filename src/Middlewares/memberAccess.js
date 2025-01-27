
const  memberAccess = async (req,res,next)=>{

    const prisma = req.app.get("prisma");

        const userId = req.user.id;
        const Checkuser = await prisma.user.findFirst({where:{id:userId}});

        if(Checkuser.designation_role !== "sde"){
            return res.status(403).json({message:"Unauthorized access! only members can update and view the assigned tasks"});
        }

        next();
}

module.exports = memberAccess;