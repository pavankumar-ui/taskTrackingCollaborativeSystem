const collaborateRouter = require('express').Router();
const { postACommmentBasedonProjectTask,
       getCommentsBasedonTask,
       updateCommentBasedonTask,
       deleteCommentBasedonTask,
       getUserPostedComments} = require('../Controllers/CollaborateControllers/commentController');

const {postAttachmentBasedonTask,
       getAttachmentBasedonTask,
       deleteAttachmentBasedonTask,
       updateAttachmentBasedonTask
} = require('../Controllers/CollaborateControllers/attachmentController');


       const validateJWT = require('../Middlewares/validateJWT');
       const teamAccess = require('../Middlewares/teamAccess');

collaborateRouter.use(validateJWT);
//comment based routes//
collaborateRouter.post("/:taskId/comment", postACommmentBasedonProjectTask);
collaborateRouter.get("/:taskId/comment",teamAccess,getCommentsBasedonTask);
collaborateRouter.put("/:commentId",updateCommentBasedonTask);
collaborateRouter.delete("/:commentId",deleteCommentBasedonTask);
collaborateRouter.get("/user/:taskId/comments",getUserPostedComments);

//atachment based routes
collaborateRouter.post("/:taskId/attachment",postAttachmentBasedonTask);
collaborateRouter.get("/:taskId/attachment",teamAccess,getAttachmentBasedonTask);
collaborateRouter.delete("/:taskId/attachment",deleteAttachmentBasedonTask);
collaborateRouter.put("/:taskId/attachment",updateAttachmentBasedonTask);


module.exports = collaborateRouter;