const CheckRole = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    const userId = req.user.id;

    const user = await prisma.user.findFirst({
        where: { id: userId }
    });

    const teamMember = await prisma.teamMember.findFirst({
        where: { userId: userId },
        include: {
            team: true // Include team details to check manager creation
        }
    });
      // For team leads, verify team was created by manager
      if (user.designation_role === "technical_lead") {
          const teamMember = await prisma.teamMember.findFirst({
              where: { userId: user.id },
              include: { team: true }
          });

          // Allow team lead access if they belong to a manager-created team
          if (teamMember?.team?.createdByManager) {
              return next();
          }
      }
    // For SDEs, check if they have owner role
    if (user.designation_role === "sde" && teamMember?.role !== "owner") {
        return res.status(403).json({
            "message": "Unauthorized access! Only owners can access this route"
        });
    }

    next();
}

module.exports = CheckRole;