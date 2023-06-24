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
    email_to_user: string,
    message_from_user: string,
    room_id: string,
  ) {
    const findUserByEmail = await this.userRepository.findUserByEmail({
      email: email_to_user,
    });

    if (!findUserByEmail) {
      throw new HttpException(400, 'User not found');
    }

    await this.messageRepository.create({
      to_user_id: findUserByEmail.id,
      from_user_id: user_id,
      bodyMessage: message_from_user,
      room_id,
    });
    return { message: 'save message' };
  }
  async updateView(room_id: string, user_id: string, email_to_user: string) {
    //Buscar o id da room
    //filtrar todas as messagens nao lidas daquele usuario que esta recebendo a mensagem (to_user_id)
    // ordernar por ordem decrescente que nao estao lidas
    const findUserByEmail = await this.userRepository.findUserByEmail({
      email: email_to_user,
    });

    if (!findUserByEmail) {
      throw new HttpException(400, 'User not found');
    }
    const updateMessagesUser = this.messageRepository.updateMessage(
      room_id,
      user_id,
      findUserByEmail.id,
    );

    return updateMessagesUser;
  }
}
export { Message };
