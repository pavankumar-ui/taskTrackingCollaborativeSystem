const taskRouter = require('express').Router();
const { createTask,
        getTasks,
        updateTasks,
        deleteTasks,
        filterTaskBasedonStatus,
        searchTaskBasedonTitle,
        searchTasksBasedonDescription } = require('../Controllers/LeadControllers/taskController');
const CheckRole = require('../Middlewares/CheckRole');
const validateJWT = require('../Middlewares/validateJWT');
const teamAccess = require('../Middlewares/teamAccess');
const createRateLimiter = require('../Utils/rateLimiter');
const {validateTask} = require('../Middlewares/Validate');
const { rateLimiterSettings } = require('../Config/aiConfig');



const taskRateLimiter = createRateLimiter(
    rateLimiterSettings.MAX_REQUESTS,
    rateLimiterSettings.WINDOW_DURATION, 
    rateLimiterSettings.ERROR_MESSAGE
);


//rate limiter for task creation to ensure that the server is not overwhelmed by excessive requests//
//validateTask is a middleware function that validates the task data//
taskRouter.post('/add', validateJWT,CheckRole,validateTask,taskRateLimiter,createTask);
taskRouter.get("/:projectId", validateJWT, CheckRole,teamAccess, getTasks);
taskRouter.put("/:Tid", validateJWT, CheckRole, updateTasks);
taskRouter.delete("/:Tid", validateJWT, CheckRole, deleteTasks);


taskRouter.get("/filter/:status", validateJWT, CheckRole, filterTaskBasedonStatus);
taskRouter.get("/:projectId/searchTitle", validateJWT, CheckRole, searchTaskBasedonTitle);
taskRouter.get("/:projectId/searchDescription", validateJWT, CheckRole, searchTasksBasedonDescription);




module.exports = taskRouter;
