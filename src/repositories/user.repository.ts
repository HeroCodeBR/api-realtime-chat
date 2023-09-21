import { UsersModel } from '../infra/models/users.model';
import {
  ICreate,
  IEmailUser,
  IPagination,
  IUser,
} from '../interfaces/users.interface';

class UsersRepository {
  async create({ name, email, password }: ICreate): Promise<IUser | null> {
    const result = await UsersModel.create({ name, email, password });
    return result ? result.toObject() : null;
  }
  async findUserByEmailRegex({ email }: IEmailUser) {
    const result = await UsersModel.find({
      email: {
        $regex: new RegExp(email, 'i'),
      },
    });
    return result;
  }
  async findUserByEmail({ email }: IEmailUser): Promise<IUser | null> {
    const result = await UsersModel.find({
      email,
    });
    return result ? result[0].toObject() : null;
  }
  async findUserById({ id }: { id: string }): Promise<IUser | null> {
    const result = await UsersModel.find({
      _id: id,
    });
    return result ? result[0].toObject() : null;
  }
  async findAllUsers({ pageNumber, pageSize }: IPagination): Promise<IUser[]> {
    const result = await UsersModel.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return result ? result.map((user) => user.toObject()) : [];
  }
  async upload(filename: string, user_id: string): Promise<boolean> {
    const result = await UsersModel.updateOne(
      { _id: user_id },
      { avatar_url: filename },
    );
    return result ? true : false;
  }
}

export { UsersRepository };
