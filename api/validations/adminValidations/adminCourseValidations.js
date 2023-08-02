const { body, param } = require('express-validator');


const admin_course_get_single_validation = [
  param('courseId')
    .optional()
    .isString().withMessage('courseId should be a string.')
    .isLength({ min: 6, max: 8 }).withMessage('courseId: min length: 6, max length: 8'),
]

const admin_course_post_validation = [
  body('courseId')
    .notEmpty().withMessage('courseId is required.')
    .isString().withMessage('courseId should be a string.')
    .isLength({ min: 6, max: 8 }).withMessage('courseId: min length: 6, max length: 8'),

  body('courseName')
    .notEmpty().withMessage('courseName is required.')
    .isString().withMessage('courseName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('courseName: min length: 2, max length: 50'),

  body('creditHours')
    .notEmpty().withMessage('creditHours is required.')
    .isNumeric().withMessage('creditHours should be a number.')
    .custom((value) => parseFloat(value) > 0 && parseFloat(value) <= 4)
    .withMessage('creditHours should be greater than 0 and less than or equal to 4.')
];

const admin_course_put_validation = [
  body('courseId')
    .optional()
    .isString().withMessage('courseId should be a string.')
    .isLength({ min: 6, max: 8 }).withMessage('courseId: min length: 6, max length: 8'),

  body('courseName')
    .optional()
    .isString().withMessage('courseName should be a string.')
    .isLength({ min: 2, max: 50 }).withMessage('courseName: min length: 2, max length: 50'),

  body('creditHours')
    .optional()
    .isNumeric().withMessage('creditHours should be a number.')
    .custom((value) => parseFloat(value) > 0 && parseFloat(value) <= 4)
    .withMessage('creditHours should be greater than 0 and less than or equal to 4.')
];



module.exports = { admin_course_get_single_validation, admin_course_post_validation, admin_course_put_validation };
