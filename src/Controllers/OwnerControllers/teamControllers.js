
const CreateTeam = async (req, res, next) => {
  const prisma = req.app.get("prisma");

  try {
    const projectId = req.body.Pid;
    const project = await prisma.project.find({ where: { Pid: projectId } });


    const team = await prisma.team.create({
      data: {
        Team_name: req.body.Team_name,
        projectId: project.Pid
      }
    });

    return res.status(201).json({
      message: "Team created Successfully",
      team_name: team.Team_name
    });

  } catch (error) {

    if (error.code === 'P2025') {
      return res.status(404).json({ message: "ProjectId not found" });
    }
    ServerError(res, error, next);
  }
}


  const getTeams = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    try {
      const teams = await prisma.team.findMany();
      return res.status(200).json({
        message: "Teams fetched Successfully",
        teams: teams
      });
    } catch (error) {
      ServerError(res, error, next);
    }
  }

  //deploy the team members both junior and lead to the team table
  const deployTeamMembers = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    try {
      const teamId = req.body.teamId;
      const userId = req.body.userId;
      const teamMember = await prisma.team.findUnique({ where: { teamId: teamId } });
      const user = await prisma.user.findUnique({ where: { id: userId } });

      console.log(user);
      console.log(teamMember);

      const addMember = await prisma.teamMember.create({
        data: {
          teamId: teamMember.teamId,
          userId: user.id,
          role: req.body.role
        }
      });

      return res.status(201).json({
        message: "Team member added Successfully",
        member_Role: addMember.role,
        member_id: addMember.teamMemberId
      });
    }
    catch (error) {

      if (error.code === 'P2025') {
        return res.status(404).json({ message: "TeamId not found" });
      }
      ServerError(res, error, next);
    }
  }


  const getTeamMembers = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    try {
      const teamMembers = await prisma.teamMember.findMany({
        include: {
          team: true,
          user: true
        }
      });

      return res.status(200).json({
        message: "Team members List fetched Successfully",
        teamMembers: {
          teamMembers: teamMembers.map((teamMember) => {
            return {
              teamMemberId: teamMember.teamMemberId,
              teamName: teamMember.team.Team_name,
              userName: teamMember.user.name,
              role: teamMember.role
            }})}});

    } catch (error) {
      ServerError(error,req,res,next);
    }
  }

  module.exports = {
    CreateTeam,
    deployTeamMembers,
    getTeams,
    getTeamMembers
  }