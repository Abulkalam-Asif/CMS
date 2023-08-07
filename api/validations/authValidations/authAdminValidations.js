const { body } = require("express-validator");

const auth_admin_login_validation = [
  body('username')
    .optional()
    .isString().withMessage('username should be a string.')
    .isLength({ min: 4 }).withMessage('username should be minimum 4 characters long.'),
    
    body('password')
    .optional()
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),
];

module.exports = { auth_admin_login_validation };