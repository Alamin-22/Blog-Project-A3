import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableField } from './user.constant';
import { UserModel } from './user.model';

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  return result;
};

export const userServices = { getAllUserFromDB };
