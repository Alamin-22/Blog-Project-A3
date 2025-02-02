

// const getAllStudentFromDB = async (query: Record<string, unknown>) => {

import { TUserType } from "./user.interface";
import { UserModel } from "./user.model";

//   const studentQuery = new QueryBuilder(
//     Student.find()
//       .populate('admissionSemester')
//       .populate({
//         path: 'academicDepartment',
//         populate: {
//           path: 'academicFaculty',
//         },
//       }),
//     query,
//   )
//     .search(studentSearchableField)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await studentQuery.modelQuery;
//   return result;
// };

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id }); // we can achieve it by using mongoDb aggregate

  const result = await UserModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

// update students form DB
const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TUserType>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete students form Db
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Student');
    }

    // get user id from the deleted student info
    const userId = deletedStudent.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    // return the value
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    console.log(error);
    throw new Error('Failed To create Student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  updateStudentIntoDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
