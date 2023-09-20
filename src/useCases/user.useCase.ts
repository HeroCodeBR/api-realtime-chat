import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { HttpException } from '../interfaces/HttpException';
import { IAuth, ICreate, IPagination } from '../interfaces/users.interface';
import { UsersRepository } from '../repositories/user.repository';
class Users {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  async create({ name, email, password }: ICreate) {
    // const userRepository = new UsersRepository()
    //Verificar se o usuario ja existe, se existir, retorna um erro.
    const findUser = await this.usersRepository.findUserByEmail({
      email,
    });
    console.log(
      '🚀 ~ file: user.useCase.ts:17 ~ Users ~ create ~ findUser:',
      findUser,
    );
    if (findUser.length > 0) {
      throw new HttpException(400, 'User exists.');
    }
    const hashPassword = await hash(password, 10);

    const result = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    return result;
  }
  async upload(filename: string, user_id: string) {
    const result = await this.usersRepository.upload(filename, user_id);
    return result;
  }

  async auth({ email, password }: IAuth) {
    const findUser = await this.usersRepository.findUserByEmail({ email });

    if (!findUser) {
      throw new HttpException(400, 'User exists.');
    }
    const passwordMatch = await compare(password, findUser[0].password!);

    if (!passwordMatch) {
      throw new HttpException(400, 'User or password invalid');
    }

    let secretKey = process.env.TOKEN_SECRET;
    if (!process.env.TOKEN_SECRET) {
      throw new HttpException(498, 'TOKEN_SECRET not found');
    }

    if (!secretKey) {
      throw new HttpException(498, 'There is no secret Key');
    }

    const token = sign(
      { name: findUser[0].name!, user_id: findUser[0].id, email },
      secretKey,
      {
        expiresIn: '7d',
      },
    );

    return {
      token,
      user: {
        email: findUser[0].email,
        name: findUser[0].name,
        avatar_url: findUser[0].avatar_url,
        _id: findUser[0]._id,
      },
    };
  }

  async findAllUsers({ pageNumber, pageSize }: IPagination) {
    const result = await this.usersRepository.findAllUsers({
      pageNumber,
      pageSize,
    });
    console.log(
      '🚀 ~ file: user.useCase.ts:71 ~ Users ~ findAllUsers ~ result:',
      result.length,
    );

    return result;
  }
  async findUserByEmail({ email }: { email: string }) {
    const result = await this.usersRepository.findUserByEmail({
      email,
    });

    return result;
  }
  async findUserByEmailRegex({ email }: { email: string }) {
    const result = await this.usersRepository.findUserByEmailRegex({
      email,
    });

    return result;
  }
}
export { Users };
