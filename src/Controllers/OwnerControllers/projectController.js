const ServerError = require('../../Utils/ServerError');
const { statusConfig } = require('../../Config/statusConfig');
const createProject = async (req, res,next) => {

    const prisma = req.app.get("prisma");
    
    //here owner refers to the Project Manager who creates the project//
    const owner = await prisma.user.findFirst({where:{id:req.user.id}});

    try{
        const projectData = await prisma.project.create({
            data:{
              name:req.body.name,
              description:req.body.description,
              ownerId:owner.id
            }
        });

        return res.status(statusConfig.CREATED).json({
            "message": "project created successfully",
             "project_id":projectData.Pid,
             "project_name":projectData.name
        });

}catch(error){
    ServerError(res,error,next);
}
}


const getAllProjects = async (req,res,next)=>{

    const prisma = req.app.get("prisma");

    try{
        const projects = await prisma.project.findMany();

        return res.status(statusConfig.SUCCESS).json({
            "message":"Projects List",
            projects
        });
    }catch(error){
        ServerError(res,error,next);
    }
    
}

const deleteProjectsById = async (req,res,next)=>{

    const prisma = req.app.get("prisma");

    const projectId = parseInt(req.params.Pid);
    

    try{
         const project = await prisma.project.delete({where:{Pid:projectId}});


          return res.status(statusConfig.SUCCESS).json({
            "message":"Project deleted successfully",
            project_id: project.Pid
        });

    }catch(error){

        if(error.code === 'P2025'){
            return res.status(statusConfig.NOT_FOUND).json({message:"Project not found for the given id"});
        }
       ServerError(res,error,next);
    }
}

module.exports ={
    createProject,
    getAllProjects,
    deleteProjectsById
}