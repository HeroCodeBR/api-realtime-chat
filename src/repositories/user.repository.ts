import { UsersModel } from '../infra/models/users.model';
import {
  ICreate,
  IEmailUser,
  IPagination,
} from '../interfaces/users.interface';

class UsersRepository {
  async create({ name, email, password }: ICreate) {
    const result = await UsersModel.create({ name, email, password });
    return result;
  }
  async findUserByEmail({ email }: IEmailUser) {
    const result = await UsersModel.findOne({ email });
    return result;
  }
  async findAllUsers({ pageNumber, pageSize }: IPagination) {
    const result = await UsersModel.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return result;
  }
}

export { UsersRepository };
