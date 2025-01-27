const memberRouter = require('express').Router();
const {viewTasksBasedonAssignedUser,UpdateThestatusofTask} = require('../Controllers/teamMemberController');
const validateJWT = require('../Middlewares/validateJWT');
const memberAccess = require('../Middlewares/memberAccess');

memberRouter.use(validateJWT);
memberRouter.use(memberAccess);

memberRouter.get("/",viewTasksBasedonAssignedUser);
memberRouter.put("/:Tid",UpdateThestatusofTask)

module.exports = memberRouter;