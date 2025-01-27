const joi = require('joi');
const {validate, Joi: JoiValidator} = require('express-validation');

  const signupSchema = { 
    body:
    joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/))
                  .required()
                  .messages({
                    "string.pattern.base": "\"password\" must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                    "any.required": "\"password\" is required",
                  }),
    designation_role: joi.string().optional()
  }),
};

  const loginSchema ={
    body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  }),
};

  const taskSchema = {
    body:joi.object({
    title: joi.string().required(),
    due_date: joi.date().required(),
    assignedTo: joi.number().optional(),
    status: joi.string().default('open'),
    projectId: joi.number().required()
  }),
};

  const projectSchema = {
    body:joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    Pid: joi.number().required()
  }),};

  const teamSchema ={
    body: joi.object({
    projectId: joi.number().required(),
    teamName: joi.string().required()
  }),
};

  const memberSchema = {
    body:joi.object({
    userId: joi.number().required(),
    teamId: joi.number().required(),
    role: joi.string().required()
  })
};

  const commentSchema = {
    body:joi.object({
    taskId: joi.number().required(),
    content: joi.string().required()
  })
};


  const attachmentSchema = {
    body:joi.object({
    taskId: joi.number().required(),
    fileUrl: joi.string().required()
  })
};


//  Universal Validation Error Handler
const validateErrors = (error, req, res, next) => {
    if (error && error.details) {
      const messages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
    next();
  };

  // Middleware Wrappers for Validation
const createValidator = (schema) => (req, res, next) => {
    const { error } = schema.body.validate(req.body, { abortEarly: false });
    if (error) return validateErrors(error, req, res, next);
    next();
  };


  const  validateSignup = createValidator(signupSchema);

  const  validateSignin = createValidator(loginSchema);

  const validateTask = createValidator(taskSchema);

  const validateProject = createValidator(projectSchema);

  const validateTeam = createValidator(teamSchema);

  const validateMember = createValidator(memberSchema);

  const validateComment = createValidator(commentSchema);

  const validateAttachment = createValidator(attachmentSchema);


  module.exports = {
    validateSignup,
    validateSignin,
    validateTask,
    validateProject,
    validateTeam,
    validateMember,
    validateComment,
    validateAttachment
  };