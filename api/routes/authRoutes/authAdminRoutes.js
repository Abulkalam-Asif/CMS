const authAdminRouter = require('express').Router();

const { auth_admin_signup, auth_admin_login } = require('../../controllers');
const { auth_admin_login_validation } = require('../../validations');

authAdminRouter.post('/signup', auth_admin_signup); // This is basic admin signup route and is not provided on the UI
authAdminRouter.post("/login", auth_admin_login_validation, auth_admin_login);


module.exports = authAdminRouter;