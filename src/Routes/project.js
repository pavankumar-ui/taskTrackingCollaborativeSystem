const projectRouter = require('express').Router();
const {createProject,getAllProjects,deleteProjectsById} = require('../Controllers/OwnerControllers/projectController');
const CheckRole = require('../Middlewares/CheckRole');
const validateJWT = require('../Middlewares/validateJWT');


projectRouter.post('/upload',validateJWT,CheckRole,createProject);
projectRouter.get('/List',validateJWT,CheckRole,getAllProjects);
projectRouter.delete('/:Pid',validateJWT,CheckRole,deleteProjectsById);

module.exports = projectRouter;