//it is the task collaboration controller where team lead and members react/share the resources of the tasks//

const { statusConfig } = require("../../Config/statusConfig");
const ServerError =  require("../../Utils/ServerError");


//collaboration functionality based on comments//
const postACommmentBasedonProjectTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const {content} = req.body;

    // Add validation for taskId
    if (!taskId) {
        return res.status(statusConfig.BAD_REQUEST).json({ message: "Task ID is required" });
    }

    try {

        //find whether task id is valid or not//
        const task = await prisma.task.findUnique({
            where: {
                Tid: parseInt(taskId) 
            }
        });

        if (!task) {
            return res.status(statusConfig.NOT_FOUND).json({message: "Task not found"});
        }

        const commentData = await prisma.comment.create({
            data: {
                 content,
                taskId: parseInt(taskId),
                 userId
            }
        });
        return res.status(statusConfig.SUCCESS).json({
            message: "Comment posted successfully",
            comment: commentData.content
        });
    } catch(error) {
        ServerError(error, req, res, next);
    }
}

//view comment based on tasks where team leader and members can comment on the task//
const getCommentsBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const taskId = req.params.taskId;
     try {
            const comments = await prisma.comment.findMany({
                where: {
                    taskId: parseInt(taskId)
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            designation_role:true
                        }
                    },
                    task: {
                        select: {
                            title: true
                        }
                    }
                },
                orderBy: {
                    created_At: 'desc'
                }
            });
            return res.status(statusConfig.SUCCESS).json({
                message: "Comments fetched successfully",
                comments:comments
            });
        } catch (error) {
           ServerError(error, req, res, next);
        }
}

//get all comments based on the specific task//
const getUserPostedComments = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    const taskId = req.params.taskId;

    try {
        const comments = await prisma.comment.findMany({
            where: {
                userId: userId,
                taskId: parseInt(taskId)
            },
            include: {
                task: {
                    select: {
                        title: true,
                        Tid: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        designation_role: true
                    }
                }
            },
            orderBy: {
                created_At: 'desc'
            }
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "Your  Posted comments fetched successfully",
            comments: comments
        });
    } catch (error) {
        ServerError(error, req, res, next);
    }
}
const updateCommentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const commentId = req.params.commentId;
    const {content} = req.body;

    try {
        const comment = await prisma.comment.findUnique({
            where: {
                commentId: parseInt(commentId)
            }
        });
        if (!comment) {
            return res.status(statusConfig.NOT_FOUND).json({message: "Comment not found"});
        }
        const updatedComment = await prisma.comment.update({
            where: {
                commentId: parseInt(commentId)
            },
            data: {
                content
            }
        });
        return res.status(statusConfig.SUCCESS).json({
            message: "Comment updated successfully",
            comment: updatedComment.content
        });
    } catch (error) {
       ServerError(error, req, res, next);
    }
}

const deleteCommentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const commentId = req.params.commentId;
    const userId = req.user.id;

    try {
        const comment = await prisma.comment.findUnique({
            where: {
                commentId: parseInt(commentId)
            }
        });
        if (!comment) {
            return res.status(statusConfig.NOT_FOUND).json({message: "Comment not found"});
        }
        await prisma.comment.delete({
            where: {
                commentId: parseInt(commentId),
                userId: userId
            }
        });
        return res.status(statusConfig.SUCCESS).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        ServerError(error, req, res, next);
    }
}


module.exports={
    postACommmentBasedonProjectTask,
    getCommentsBasedonTask,
    updateCommentBasedonTask,
    deleteCommentBasedonTask,
    getUserPostedComments
}