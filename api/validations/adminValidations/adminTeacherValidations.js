const { body, param } = require('express-validator');


const admin_teacher_get_single_validation = [
  param('teacherId')
    .optional()
    .isString().withMessage('teacherId should be a string.')
    .isLength({ min: 8, max: 8 }).withMessage('teacherId should be exactly 8 characters long.'),
]

const admin_teacher_post_validation = [
  body('teacherId')
    .notEmpty().withMessage('teacherId is required.')
    .isString().withMessage('teacherId should be a string.')
    .isLength({ min: 8, max: 8 }).withMessage('teacherId should be exactly 8 characters long.'),

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

  body('qualification')
    .notEmpty().withMessage('qualification is required.')
    .isString().withMessage('qualification should be a string.')
    .isLength({ min: 4 }).withMessage('qualification should be minimum 4 characters long.'),

  body('department')
    .notEmpty().withMessage('department is required.')
    .isString().withMessage('department should be a string.')
    .isIn(["Computer Science",
      "Information Technology",
      "Software Engineering",
      "Data Science",]).withMessage("department should be either Computer Science, Information Technology, Software Engineering or Data Science"),
];

const admin_teacher_put_validation = [
  body('teacherId')
    .optional()
    .isString().withMessage('teacherId should be a string.')
    .isLength({ min: 8, max: 8 }).withMessage('teacherId should be exactly 8 characters long.'),

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

  body('qualification')
    .optional()
    .isString().withMessage('qualification should be a string.')
    .isLength({ min: 4 }).withMessage('qualification should be minimum 4 characters long.'),

  body('department')
    .optional()
    .isString().withMessage('department should be a string.')
    .isIn(["Computer Science",
      "Information Technology",
      "Software Engineering",
      "Data Science",]).withMessage("department should be either Computer Science, Information Technology, Software Engineering or Data Science"),
];


module.exports = { admin_teacher_get_single_validation, admin_teacher_post_validation, admin_teacher_put_validation };
