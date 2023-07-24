const router = require('express').Router();
const { admin_student_post, admin_student_delete, admin_student_put, admin_students_get_all, admin_student_get_single } = require('../../controllers');
const { admin_students_get_single_validation, admin_student_post_validation, admin_student_put_validation } = require("../../validations");

router.get('/', admin_students_get_all);
router.get('/:rollNo', admin_students_get_single_validation, admin_student_get_single);
router.post('/', admin_student_post_validation, admin_student_post);
router.delete('/:rollNo', admin_student_delete);
router.put('/:rollNo', admin_student_put_validation, admin_student_put);

module.exports = router;