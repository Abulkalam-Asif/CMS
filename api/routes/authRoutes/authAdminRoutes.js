const authAdminRouter = require('express').Router();

const { auth_admin_signup } = require('../../controllers');

authAdminRouter.post('/signup', auth_admin_signup);


module.exports = authAdminRouter;