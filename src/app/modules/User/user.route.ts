import express from 'express';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';
const router = express.Router();

router.post(
  '/create_user',
  ValidateRequestMiddleWare(userValidations.createUserSchema),
  userControllers.createUser,
);

// router.get('/', studentControllers.getAllStudents);

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
