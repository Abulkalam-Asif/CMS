const adminAuthRouter = require('express').Router();

const bcrypt = require("bcrypt");
const Teacher = require("../../models/Teacher")


adminAuthRouter.get('/');



module.exports = adminAuthRouter;