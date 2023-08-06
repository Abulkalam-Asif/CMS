const { body } = require("express-validator");

const auth_admin_login_validation = [
  body('username')
    .notEmpty().withMessage('username is required.')
    .isString().withMessage('username should be a string.')
    .isLength({ min: 4 }).withMessage('username should be minimum 4 characters long.'),

  body('password')
    .notEmpty().withMessage('password is required.')
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),
];

module.exports = { auth_admin_login_validation };