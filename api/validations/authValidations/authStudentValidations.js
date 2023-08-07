const { body } = require("express-validator");

const auth_student_login_validation = [
  body('rollNo')
    .optional()
    .isString().withMessage('rollNo should be a string.')
    .isLength({ min: 10, max: 10 }).withMessage('rollNo should be exactly 10 characters long.'),

  body('password')
    .optional()
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),
];

module.exports = { auth_student_login_validation };