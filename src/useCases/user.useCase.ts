import { sign } from 'jsonwebtoken';
import { IAuth, ICreate, IPagination } from '../interfaces/users.interface';
import { UsersRepository } from '../repositories/user.repository';
import { compare, hash } from 'bcrypt';
import { HttpException } from '../interfaces/HttpException';
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
    if (findUser) {
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
  update() {}

  async auth({ email, password }: IAuth) {
    const findUser = await this.usersRepository.findUserByEmail({ email });

    if (!findUser) {
      throw new HttpException(400, 'User exists.');
    }
    const passwordMatch = await compare(password, findUser.password!);

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
      { name: findUser.name!, user_id: findUser.id, email },
      secretKey,
      {
        expiresIn: '7d',
      },
    );

    return {
      token,
      user: {
        email: findUser.email,
        name: findUser.name,
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
}
export { Users };
