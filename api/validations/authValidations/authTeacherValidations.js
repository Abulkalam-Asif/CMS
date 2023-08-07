const { body } = require("express-validator");

const auth_teacher_login_validation = [
  body('teacherId')
    .optional()
    .isString().withMessage('teacherId should be a string.')
    .isLength({ min: 8, max: 8 }).withMessage('teacherId should be exactly 8 characters long.'),

  body('password')
    .optional()
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),
];

module.exports = { auth_teacher_login_validation };