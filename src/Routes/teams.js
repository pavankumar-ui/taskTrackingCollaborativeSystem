const teamsRouter = require('express').Router();
const {CreateTeam,deployTeamMembers,getTeams,getTeamMembers} = require('../Controllers/OwnerControllers/teamControllers');
const CheckRole = require('../Middlewares/CheckRole');
const validateJWT = require('../Middlewares/validateJWT');


teamsRouter.post('/generate',validateJWT,CheckRole,CreateTeam);
teamsRouter.get('/List',validateJWT,CheckRole,getTeams);
teamsRouter.post('/deployMembers',validateJWT,CheckRole,deployTeamMembers);
teamsRouter.get('/members',validateJWT,CheckRole,getTeamMembers);


module.exports = teamsRouter;
