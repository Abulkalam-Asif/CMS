const adminTeacherRouter = require('express').Router();
const { admin_teachers_get_all, admin_teacher_get_single, admin_teacher_post, admin_teacher_delete, admin_teacher_put } = require("../../controllers");
const { admin_teacher_get_single_validation, admin_teacher_post_validation, admin_teacher_put_validation } = require("../../validations");

const bcrypt = require('bcrypt');
const Teacher = require('../../models/Teacher');


adminTeacherRouter.get('/', admin_teachers_get_all);
adminTeacherRouter.get('/:teacherId', admin_teacher_get_single_validation, admin_teacher_get_single);
adminTeacherRouter.post('/', admin_teacher_post_validation, admin_teacher_post);
adminTeacherRouter.delete('/:teacherId', admin_teacher_delete);
adminTeacherRouter.put('/:teacherId', admin_teacher_put_validation, admin_teacher_put);


// This is a temporary route to add multiple teachers to the database
// (Uncomment it to POST an array of teachers to the database for testing purposes)

// adminTeacherRouter.post("/temp", (req, res) => {
//   let addTeacher = async (teacher) => {
//     teacher.teacherId = teacher.teacherId.toUpperCase();
//     let hashedPassword = await bcrypt.hash(teacher.password, 10);
//     teacher = new Teacher({ ...teacher, password: hashedPassword });
//     await teacher.save();
//   }
//   req.body.forEach(teacher => {
//     addTeacher(teacher);
//   });
//   return res.status(200).json({ message: "Teachers added successfully." });
// })

// This is a temporary route to add multiple teachers to the database


module.exports = adminTeacherRouter;