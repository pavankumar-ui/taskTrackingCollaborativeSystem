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




// Define rate limit (e.g., 5 requests per minute)
const taskRateLimiter = createRateLimiter(
    5, // Max requests
    60 * 1000, // 1 minute
    'You have exceeded the maximum number of task creation attempts. Please try again later.'
);


//rate limiter for task creation to ensure that the server is not overwhelmed by excessive requests//
taskRouter.post('/add', validateJWT, CheckRole,taskRateLimiter,createTask);
taskRouter.get("/:projectId", validateJWT, CheckRole,teamAccess, getTasks);
taskRouter.put("/:Tid", validateJWT, CheckRole, updateTasks);
taskRouter.delete("/:Tid", validateJWT, CheckRole, deleteTasks);


taskRouter.get("/filter/:status", validateJWT, CheckRole, filterTaskBasedonStatus);
taskRouter.get("/:projectId/searchTitle", validateJWT, CheckRole, searchTaskBasedonTitle);
taskRouter.get("/:projectId/searchDescription", validateJWT, CheckRole, searchTasksBasedonDescription);




module.exports = taskRouter;
