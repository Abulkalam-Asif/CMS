const adminCourseRouter = require('express').Router();
const { admin_courses_get_all, admin_course_post, admin_course_get_single, admin_course_delete, admin_course_put } = require('../../controllers');
const { admin_course_get_single_validation, admin_course_post_validation, admin_course_put_validation } = require('../../validations');

const Course = require('../../models/Course');

adminCourseRouter.get('/', admin_courses_get_all);
adminCourseRouter.get('/:courseId', admin_course_get_single_validation, admin_course_get_single);
adminCourseRouter.post('/', admin_course_post_validation, admin_course_post);
adminCourseRouter.delete('/:courseId', admin_course_delete);
adminCourseRouter.put('/:courseId', admin_course_put_validation, admin_course_put);


// This is a temporary route to add multiple courses to the database
// (Uncomment it to POST an array of courses to the database for testing purposes)

// adminCourseRouter.post("/temp", (req, res) => {
//   let addCourse = async (course) => {
//     course.courseId = course.courseId.toUpperCase();
//     course = new Course({ ...course });
//     await course.save();
//   }
//   req.body.forEach(course => {
//     addCourse(course);
//   });
//   return res.status(200).json({ message: "Courses added successfully." });
// })

// This is a temporary route to add multiple courses to the database


module.exports = adminCourseRouter;