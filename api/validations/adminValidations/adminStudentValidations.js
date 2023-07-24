const { body, param } = require('express-validator');

const admin_students_get_single_validation = [
  param('rollNo')
    .optional()
    .isString().withMessage('rollNo should be a string.')
    .isLength({ min: 10, max: 10 }).withMessage('rollNo should be exactly 10 characters long.'),
]

const admin_student_post_validation = [
  body('rollNo')
    .notEmpty().withMessage('rollNo is required.')
    .isString().withMessage('rollNo should be a string.')
    .isLength({ min: 10, max: 10 }).withMessage('rollNo should be exactly 10 characters long.'),

  body('firstName')
    .notEmpty().withMessage('firstName is required.')
    .isString().withMessage('firstName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('firstName: min length: 2, max length: 50'),

  body('lastName')
    .notEmpty().withMessage('lastName is required.')
    .isString().withMessage('lastName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('lastName: min length: 2, max length: 50'),

  body('password')
    .notEmpty().withMessage('password is required.')
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),

  body('gender')
    .notEmpty().withMessage('gender is required.')
    .isString().withMessage('gender should be a string.')
    .isIn(["Male", "Female"]).withMessage("gender should be either Male or Female."),

  body('program')
    .notEmpty().withMessage('program is required.')
    .isString().withMessage('program should be a string.')
    .isIn(["Computer Science",
      "Information Technology",
      "Software Engineering",
      "Data Science",]).withMessage("program should be either Computer Science, Information Technology, Software Engineering or Data Science"),
]

const admin_student_put_validation = [
  body('rollNo')
    .optional()
    .isString().withMessage('rollNo should be a string.')
    .isLength({ min: 10, max: 10 }).withMessage('rollNo should be exactly 10 characters long.'),

  body('firstName')
    .optional()
    .isString().withMessage('firstName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('firstName: min length: 2, max length: 50'),

  body('lastName')
    .optional()
    .isString().withMessage('lastName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('lastName: min length: 2, max length: 50'),

  body('password')
    .optional()
    .isString().withMessage('password should be a string.')
    .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),

  body('gender')
    .optional()
    .isString().withMessage('gender should be a string.')
    .isIn(["Male", "Female"]).withMessage("gender should be either Male or Female."),

  body('program')
    .optional()
    .isString().withMessage('program should be a string.')
    .isIn(["Computer Science",
      "Information Technology",
      "Software Engineering",
      "Data Science",]).withMessage("program should be either Computer Science, Information Technology, Software Engineering or Data Science"),
]

module.exports = { admin_students_get_single_validation, admin_student_post_validation, admin_student_put_validation };