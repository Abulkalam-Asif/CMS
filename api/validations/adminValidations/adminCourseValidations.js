const { body, param } = require('express-validator');


// const admin_course_get_single_validation = [
//   param('courseId')
//     .optional()
//     .isString().withMessage('courseId should be a string.')
//     .isLength({ min: 8, max: 8 }).withMessage('courseId should be exactly 8 characters long.'),
// ]

const admin_course_post_validation = [
  body('courseId')
    .notEmpty().withMessage('courseId is required.')
    .isString().withMessage('courseId should be a string.')
    .isLength({ min: 6, max: 6 }).withMessage('courseId should be exactly 6 characters long.'),

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

// const admin_course_put_validation = [
//   body('courseId')
//     .optional()
//     .isString().withMessage('courseId should be a string.')
//     .isLength({ min: 8, max: 8 }).withMessage('courseId should be exactly 8 characters long.'),

//   body('firstName')
//     .optional()
//     .isString().withMessage('firstName should be a string.')
//     .isLength({ min: 2, max: 50 }).withMessage('firstName: min length: 2, max length: 50'),

//   body('lastName')
//     .optional()
//     .isString().withMessage('lastName should be a string.')
//     .isLength({ min: 2, max: 50 }).withMessage('lastName: min length: 2, max length: 50'),

//   body('password')
//     .optional()
//     .isString().withMessage('password should be a string.')
//     .isLength({ min: 4 }).withMessage('password should be minimum 4 characters long.'),

//   body('gender')
//     .optional()
//     .isString().withMessage('gender should be a string.')
//     .isIn(["Male", "Female"]).withMessage("gender should be either Male or Female."),

//   body('qualification')
//     .optional()
//     .isString().withMessage('qualification should be a string.')
//     .isLength({ min: 4 }).withMessage('qualification should be minimum 4 characters long.'),

//   body('department')
//     .optional()
//     .isString().withMessage('department should be a string.')
//     .isIn(["Computer Science",
//       "Information Technology",
//       "Software Engineering",
//       "Data Science",]).withMessage("department should be either Computer Science, Information Technology, Software Engineering or Data Science"),
// ];


module.exports = { admin_course_post_validation };
