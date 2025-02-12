
//this middleware is used to check whether the user belongs to the team or not//

const { statusConfig } = require("../Config/statusConfig");

const teamAccess = async (req,res,next)=>{

    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    // Verify user belongs to the team
    const teamMember = await prisma.teamMember.findFirst({
        where: {
            userId: userId,
        },
        include:{
            team:true,
            user:true
        }
    });

    //console.log(teamMember);

    // Check if user is team lead for this project
    const isTeamLead = prisma.user.designation_role === "technical_lead" &&
                       prisma.teamMember.role === "owner";

    
   // Fetch team details for comparison
  const team = await prisma.team.findUnique({
      where: {
          teamId: teamMember.teamId
      },
  });

    //to check whether user belongs to the same team or not
    const isTeamMember = team && teamMember && team.teamId === teamMember.teamId;

    //console.log(isTeamMember);

    // Check if user is team lead or member belongs to the same project,if not restrict access to attachments//
    if (!isTeamMember && !isTeamLead) {
        return res.status(statusConfig.INVALID_ROLE).json({
            message: "Access restricted - Only project specific team members can view attachments and comments"
        });
    }
    next();
}

module.exports = teamAccess;