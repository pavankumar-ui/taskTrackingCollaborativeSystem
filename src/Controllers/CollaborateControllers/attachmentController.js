const ServerError = require('../../Utils/ServerError');
const {statusConfig} = require('../../Config/statusConfig');

const postAttachmentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const {taskId} = req.params;
    const {fileUrl} = req.body;
    const uploadedBy = req.user.id;

     try {
         
      const task = await prisma.task.findFirst({
        where:{
             Tid:parseInt(taskId)
        }
      });
      
        const attachment = await prisma.attachment.create({
             data:{
                    taskId:parseInt(task.Tid),
                    fileUrl:fileUrl,
                    uploadedBy
             }
        });

        return res.status(statusConfig.SUCCESS).json({
            message:"file attached successfully",
            fileUrl:attachment.fileUrl,
            task:task.title

        });
        
     } catch (error) {
        ServerError(res, error,next);
     }  
}

const getAttachmentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const {taskId} = req.params;
   

    try {

        const attachments = await prisma.attachment.findMany({
            where: {
                taskId: parseInt(taskId)
            },
            include: {
                user: true,
                task: true
            }
        });

        return res.status(statusConfig.SUCCESS).json({
            message: "attachments fetched successfully",
            attachments: attachments.map(attachment => ({
                fileUrl: attachment.fileUrl,
                task: attachment.task.title,
                uploadedBy: attachment.user.name
            }))
        });

    } catch(error) {
        ServerError(res, error, next);
    }
}

const updateAttachmentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const {attachmentId} = req.params;
    const {fileUrl} = req.body;

      try{
        const attachment = await prisma.attachment.update({
          where:{
            attachmentId:parseInt(attachmentId),
            uploadedBy:req.user.id
          },
          data:{
            fileUrl
          }
        });
            return res.status(statusConfig.SUCCESS).json({
            message:"attachment updated successfully",
            attachment:attachment.fileUrl
        });

      }catch(error){
        ServerError(res, error,next);
      }
}

const deleteAttachmentBasedonTask = async (req, res, next) => {
    const prisma = req.app.get("prisma");
    const {attachmentId} = req.params;

    try{
        const attachment = await prisma.attachment.delete({
            where:{
                attachmentId:parseInt(attachmentId),
                uploadedBy:req.user.id
            }
        });

        if(!attachment) return res.status(statusConfig.NOT_FOUND).json({
            message:"attachment ID not found"
        });

        return res.status(statusConfig.SUCCESS).json({
            message:"attachment deleted successfully",
            attachment:attachment.fileUrl
        });

}catch(error){
    ServerError(res, error,next); 
  }
}

module.exports={
    postAttachmentBasedonTask,
    getAttachmentBasedonTask,
    deleteAttachmentBasedonTask,
    updateAttachmentBasedonTask
}