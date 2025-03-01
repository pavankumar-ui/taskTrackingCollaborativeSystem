const ServerError = require('../Utils/ServerError');
const {statusConfig} = require('../Config/statusConfig');

//this file functionality is to handle the team member related operations//
const viewTasksBasedonAssignedUser = async (req, res, next) => {

    const prisma = req.app.get("prisma");

    try {

        //check the member access to update and view the tasks//
        const checkMemberId = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        });


        const assignedMember = await prisma.task.findMany({
            where: {
                assignedTo: checkMemberId.id
            }
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "Tasks Lists assigned to You",
            tasks: assignedMember,
            projectName: assignedMember.projectId
        });
    }
    catch (error) {
        ServerError(req,res,error,next);
    }

}


const UpdateThestatusofTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");

    try {
        const { Tid } = req.params;
        const status = req.body.status;

        if (Tid === "" || undefined) {
            return res.status(statusConfig.BAD_REQUEST).json({ message: "Task ID is required" });
        }

        // First verify the task exists and belongs to the user
        const taskExists = await prisma.task.findFirst({
            where: { Tid: parseInt(Tid), assignedTo: req.user.id }
        });


        if (!taskExists) {
            return res.status(statusConfig.NOT_FOUND)
            .json({
                 message: "Task Not Found or Not Assigned to You"
                 });
        }

        const updateTaskStatus = await prisma.task.update({
            where: {
                Tid: parseInt(Tid)
            },
            data: {
                status: status
            }
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "Task Status Updated Successfully",
            taskID: updateTaskStatus.Tid,
            Status: updateTaskStatus.status
        });

    } catch (error) {
        ServerError(req,res,error,next);
    }
}
module.exports = {
    viewTasksBasedonAssignedUser,
    UpdateThestatusofTask
}