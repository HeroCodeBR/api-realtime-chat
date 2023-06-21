import { HttpException } from '../interfaces/HttpException';
import { MessageRepository } from '../repositories/message.repository';
import { UsersRepository } from '../repositories/user.repository';

class Message {
  private messageRepository: MessageRepository;
  private userRepository: UsersRepository;
  constructor() {
    this.messageRepository = new MessageRepository();
    this.userRepository = new UsersRepository();
  }
  async create(
    user_id: string,
    email_from_user: string,
    message_from_user: string,
  ) {
    const findUserByEmail = await this.userRepository.findUserByEmail({
      email: email_from_user,
    });

    if (!findUserByEmail) {
      throw new HttpException(400, 'User not found');
    }

    const saveMessage = await this.messageRepository.create({
      to_user_id: findUserByEmail.id,
      from_user_id: user_id,
      bodyMessage: message_from_user,
    });
  }
}
export { Message };
