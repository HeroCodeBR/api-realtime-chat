import { UsersRepository } from '../repositories/user.repository';

class Users {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  async create({ name, email, password }) {
    // const userRepository = new UsersRepository()
    //Verificar se o usuario ja existe, se existir, retorna um erro.
    const findUser = await this.usersRepository.findUserByEmail({
      email,
    });
    if (findUser) {
      throw new Error('User exists.');
    }
    return findUser;
  }
  update() {}
}
export { Users };
