const express = require('express');
const authRoutes = require('./authRoutes');
const projectRoutes = require('./project');
const teamRouter = require('./teams');
const taskRouter = require('./tasks');
const memberRouter = require('./members');
const collaborateRouter = require('./collaborate');
const indexRoutes = express.Router();

indexRoutes.use("/auth", authRoutes);
indexRoutes.use("/projects", projectRoutes); 
indexRoutes.use("/teams", teamRouter);
indexRoutes.use("/tasks", taskRouter); 
indexRoutes.use("/memberTask", memberRouter);
indexRoutes.use("/collaborate", collaborateRouter);


module.exports = indexRoutes;
