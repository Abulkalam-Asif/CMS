const { body } = require("express-validator");

const student_login_validation = [
  body('rollNo')
    .notEmpty().withMessage('rollNo is required.')
    .isString().withMessage('rollNo should be a string.')
    .isLength({ min: 10, max: 10 }).withMessage('rollNo should be exactly 10 characters long.'),

  body('password')
    .notEmpty().withMessage('password is required.')
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),
];

module.exports = { student_login_validation };