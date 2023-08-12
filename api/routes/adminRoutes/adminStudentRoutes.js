const adminStudentRouter = require('express').Router();
const { admin_student_post, admin_student_delete, admin_student_put, admin_students_get_all, admin_student_get_single } = require('../../controllers');
const { admin_student_get_single_validation, admin_student_post_validation, admin_student_put_validation } = require("../../validations");


const bcrypt = require("bcrypt");
const Student = require("../../models/Student")


adminStudentRouter.get('/', admin_students_get_all);
adminStudentRouter.get('/:rollNo', admin_student_get_single_validation, admin_student_get_single);
adminStudentRouter.post('/', admin_student_post_validation, admin_student_post);
adminStudentRouter.delete('/:rollNo', admin_student_delete);
adminStudentRouter.put('/:rollNo', admin_student_put_validation, admin_student_put);


// This is a temporary route to add multiple students to the database
adminStudentRouter.post("/temp", (req, res) => {
  let addStudent = async (student) => {
    student.rollNo = student.rollNo.toUpperCase();
    let hashedPassword = await bcrypt.hash(student.password, 10);
    student = new Student({ ...student, password: hashedPassword });
    await student.save();
  }
  req.body.forEach(student => {
    addStudent(student);
  });
  return res.status(200).json({ message: "Students added successfully." });
})
// This is a temporary route to add multiple students to the database

module.exports = adminStudentRouter;