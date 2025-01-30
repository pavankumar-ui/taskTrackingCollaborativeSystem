const teamsRouter = require('express').Router();
const {CreateTeam,deployTeamMembers,getTeams,getTeamMembers} = require('../Controllers/OwnerControllers/teamControllers');
const CheckRole = require('../Middlewares/CheckRole');
const validateJWT = require('../Middlewares/validateJWT');
const {validateTeam,validateMember} = require('../Middlewares/Validate');

//here we are using the middleware to check the role of the user//
//and then we are using the middleware to validate the data during the creation of the team and 
// the deployment of the team members//

teamsRouter.post('/generate',validateJWT,CheckRole,validateTeam,CreateTeam);
teamsRouter.get('/List',validateJWT,CheckRole,getTeams);
teamsRouter.post('/deployMembers',validateJWT,CheckRole,validateMember,deployTeamMembers);
teamsRouter.get('/members',validateJWT,CheckRole,getTeamMembers);


module.exports = teamsRouter;
