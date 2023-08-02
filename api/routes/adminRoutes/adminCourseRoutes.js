const router = require('express').Router();
const { admin_courses_get_all, admin_course_post, admin_course_get_single, admin_course_delete, admin_course_put } = require('../../controllers/adminControllers/adminCourseControllers');
const { admin_course_post_validation, admin_course_get_single_validation, admin_course_put_validation } = require('../../validations/adminValidations/adminCourseValidations.js');


const bcrypt = require('bcrypt');
const Course = require('../../models/Course');


router.get('/', admin_courses_get_all);
router.get('/:courseId', admin_course_get_single_validation, admin_course_get_single);
router.post('/', admin_course_post_validation, admin_course_post);
router.delete('/:courseId', admin_course_delete);
router.put('/:courseId', admin_course_put_validation, admin_course_put);


// This is a temporary route to add multiple courses to the database
router.post("/temp", (req, res) => {
  let addCourse = async (course) => {
    course.courseId = course.courseId.toUpperCase();
    course = new Course({ ...course });
    await course.save();
  }
  req.body.forEach(course => {
    addCourse(course);
  });
  res.status(200).json({ message: "Courses added successfully." });
})
// This is a temporary route to add multiple courses to the database


module.exports = router;