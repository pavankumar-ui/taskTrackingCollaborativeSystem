const ServerError = require("../../Utils/ServerError");
const NotificationService = require("../../Services/notifications");
const OpenAI = require('openai');
const { aiConstantSettings } = require("../../Config/aiConfig");
const { statusConfig } = require("../../Config/statusConfig");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const createTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const io = req.app.get("io");

    try {
        const userId = req.body.assignedTo;
        const { title, due_date, status, projectId } = req.body;
        const notificationService = new NotificationService(io);


        // Generate description using OpenAI
        const completion = await openai.chat.completions.create({
            model: aiConstantSettings.AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a task management assistant.Provide detailed task descriptions."
                },
                {
                    role: "user",
                    content: `Generate a detailed description for the task: ${title}`
                }
            ],
            max_tokens: aiConstantSettings.SET_MAX_TOKENS,
            temperature: aiConstantSettings.SET_TEMPERATURE
        });

        const aiDescription = completion.choices[0].message.content;

        // Create task with AI-generated description
        const task = await prisma.task.create({
            data: {
                title,
                description: aiDescription,
                due_date,
                status,
                assignedTo: userId,
                projectId
            }
        });

        //Now, notify the assigned user about the task//
        notificationService.notifyTaskAssignment(userId, task);


        return res.status(statusConfig.CREATED).json({
            message: "Task created successfully",
            taskId: task.Tid,
            description: aiDescription
        });


    } catch (error) {
        ServerError(error, req, res, next);
    }
}


const getTasks = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const { projectId } = req.params;

    try {
        //fetch the tasks based on project id//
        const tasks = await prisma.task.findMany({
            where: {
                projectId: parseInt(projectId),
            }
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "Task List fetched successfully",
            tasksList: tasks,
        });
    } catch (error) {
        ServerError(error, req, res, next);
    }
};

const updateTasks = async (req, res, next) => {

    const prisma = req.app.get("prisma");
    const io = req.app.get("io");
    const notificationService = new NotificationService(io);


    try {

        const userId = req.body.assignedTo;
        const { Tid } = req.params;
        const { title, description, due_date, status, projectId } = req.body;


        const taskUpdate = await prisma.task.update(
            {
                where: { Tid: parseInt(Tid) },
                data: {
                    title: title,
                    description: description,
                    due_date: due_date,
                    status: status,
                    assignedTo: userId,
                    projectId: projectId
                }
            });

        if (!taskUpdate) return res.status(statusConfig.NOT_FOUND)
            .json({ message: "Task not found for the task id" });

        //update the task in the notification service//
        if (taskUpdate.userId) {
            notificationService.notifyTaskUpdate(taskUpdate.userId, taskUpdate);
        }

        return res.status(statusConfig.SUCCESS).json({
            message: "Task updated Successfully",
            taskUpdate: taskUpdate
        });

    }
    catch (error) {
        ServerError(error, req, res, next);
    }
}


const deleteTasks = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    try {
        const { Tid } = req.params;

        const taskDelete = await prisma.task.delete({
            where: {
                Tid: parseInt(Tid)
            }
        });

        if (!taskDelete) return res.status(statusConfig.NOT_FOUND).json({
            message: "Task not found for the task id"
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "Task deleted successfully",
            taskDelete: taskDelete
        });
    } catch (error) {
        ServerError(error, req, res, next);
    }

}

//task filtering,sorting and searching based on query params on tasks//

//filter task based on their status//

const filterTaskBasedonStatus = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    try {

        const statusparams = req.params.status;

        if (statusparams !== "completed" && statusparams !== "open" && statusparams !== "Inprogress") {
            return res.status(statusConfig.BAD_REQUEST).json({ "message": "Invalid status parameter" });
        }

        const tasks = await prisma.task.findMany({ where: { status: statusparams } });

        if (tasks.length === 0) {
            return res.status(statusConfig.NOT_FOUND).json({ "message": "No tasks found based on status" });
        }

        return res.status(statusConfig.SUCCESS).json({
            message: "Tasks fetched based on status",
            tasks: tasks
        });
    } catch (error) {
        ServerError(error, req, res, next);
    }
}


//get the tasks based on title search//
const searchTaskBasedonTitle = async (req, res, next) => {
    const prisma = req.app.get("prisma");

    try {
        const title = req.query.title;
        const { projectId } = req.params;

        const tasks = await prisma.task.findMany(
            {
                where:
                {
                    title: { contains: title },
                    projectId: parseInt(projectId)
                }
            });

        if (tasks.length === 0) {
            return res.status(statusConfig.NOT_FOUND).json({ "message": "No tasks found based on title" });
        }

        return res.status(statusConfig.SUCCESS).json(
            {
                message: "tasks fetched based on Title",
                tasks: tasks
            }
        );
    }
    catch (error) {
        ServerError(error, req, res, next);
    }
}


const searchTasksBasedonDescription = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    try {
        const description = req.query.description;
        const { projectId } = req.params;

        const tasks = await prisma.task.findMany(
            {
                where: {
                    description: {
                        contains: description
                    },
                    projectId: parseInt(projectId)
                }
            }
        );


        if (tasks.length === 0) {
            return res.status(statusConfig.NOT_FOUND)
                 .json({ "message": "No tasks found based on description" });
        }

        return res.status(statusConfig.SUCCESS).json({
            message: "Tasks fetched based on description",
            tasks: tasks
        });
    }
    catch (error) {
        ServerError(error, req, res, next);
    }

}


module.exports = {
    createTask,
    getTasks,
    updateTasks,
    deleteTasks,
    filterTaskBasedonStatus,
    searchTaskBasedonTitle,
    searchTasksBasedonDescription
};