import config from '../../../config';
import ApiError from '../../../errors/api-error';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './users.utils';

const create_user = async (user: IUser): Promise<IUser | null> => {
  //auto genetaed incremental id
  const id = await generateUserId();

  user.id = id;
  //default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const created_user = await User.create(user);
  if (!created_user) {
    throw new ApiError(400, 'Failed to create user');
  }
  return created_user;
};

export const UserService = {
  create_user,
};
