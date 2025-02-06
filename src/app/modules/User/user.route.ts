import express from 'express';

import { userControllers } from './user.controller';
const router = express.Router();

router.get('/', userControllers.getAllUser);
router.get('/:id', userControllers.getSingleUser);

// router.get('/:id', studentControllers.getSingleStudent);
// // to delete student
// router.patch(
//   '/:id',
//   ValidateRequestMiddleWare(StudentValidations.updateStudentValidationSchema),
//   studentControllers.updateStudent,
// );
// // update
// router.delete('/:id', studentControllers.deleteStudent);

export const usersRout = router;
