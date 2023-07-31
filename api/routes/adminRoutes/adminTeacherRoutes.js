const router = require('express').Router();
const { admin_teachers_get_all, admin_teacher_post, admin_teacher_get_single, admin_teacher_delete, admin_teacher_put } = require('../../controllers/adminControllers/adminTeacherControllers');
const { admin_teacher_post_validation, admin_teacher_get_single_validation, admin_teacher_put_validation } = require('../../validations/adminValidations/adminTeacherValidations');


const bcrypt = require('bcrypt');
const Teacher = require('../../models/Teacher');


router.get('/', admin_teachers_get_all);
router.get('/:teacherId', admin_teacher_get_single_validation, admin_teacher_get_single);
router.post('/', admin_teacher_post_validation, admin_teacher_post);
router.delete('/:teacherId', admin_teacher_delete);
router.put('/:teacherId', admin_teacher_put_validation, admin_teacher_put);


// This is a temporary route to add multiple teachers to the database
router.post("/temp", (req, res) => {
  let addTeacher = async (teacher) => {
    teacher.teacherId = teacher.teacherId.toUpperCase();
    let hashedPassword = await bcrypt.hash(teacher.password, 10);
    teacher = new Teacher({ ...teacher, password: hashedPassword });
    await teacher.save();
  }
  req.body.forEach(teacher => {
    addTeacher(teacher);
  });
  res.status(200).json({ message: "Teachers added successfully." });
})
// This is a temporary route to add multiple teachers to the database


module.exports = router;