//it is the task collaboration controller where team lead and members react/share the resources of the tasks//


//collaboration functionality based on comments//
const postACommmentBasedonProjectTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const {content} = req.body;

    // Add validation for taskId
    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {

        //find whether task id is valid or not//
        const task = await prisma.task.findUnique({
            where: {
                Tid: parseInt(taskId) 
            }
        });

        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }

        const commentData = await prisma.comment.create({
            data: {
                 content,
                taskId: parseInt(taskId),
                 userId
            }
        });
        return res.status(200).json({
            message: "Comment posted successfully",
            comment: commentData.content
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
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
            return res.status(200).json({
                message: "Comments fetched successfully",
                comments:comments
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"});
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

        return res.status(200).json({
            message: "Your  Posted comments fetched successfully",
            comments: comments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
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
            return res.status(404).json({message: "Comment not found"});
        }
        const updatedComment = await prisma.comment.update({
            where: {
                commentId: parseInt(commentId)
            },
            data: {
                content
            }
        });
        return res.status(200).json({
            message: "Comment updated successfully",
            comment: updatedComment.content
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
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
            return res.status(404).json({message: "Comment not found"});
        }
        await prisma.comment.delete({
            where: {
                commentId: parseInt(commentId),
                userId: userId
            }
        });
        return res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


module.exports={
    postACommmentBasedonProjectTask,
    getCommentsBasedonTask,
    updateCommentBasedonTask,
    deleteCommentBasedonTask,
    getUserPostedComments
}