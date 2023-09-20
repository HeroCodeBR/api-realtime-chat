import { HttpException } from '../interfaces/HttpException';
import { MessageRepository } from '../repositories/message.repository';
import { RoomsRepository } from '../repositories/rooms.repository';
import { UsersRepository } from '../repositories/user.repository';

class Rooms {
  private roomsRepository: RoomsRepository;
  private usersRepository: UsersRepository;
  private messagesRepository: MessageRepository;
  constructor() {
    this.roomsRepository = new RoomsRepository();
    this.usersRepository = new UsersRepository();
    this.messagesRepository = new MessageRepository();
  }
  async create(email: string, user_id: string) {
    const findDestinationUserId = await this.usersRepository.findUserByEmail({
      email,
    });

    if (!findDestinationUserId) {
      throw new HttpException(400, 'User not found');
    }

    const result = await this.roomsRepository.create({
      user_id_joined_room: findDestinationUserId.id,
      user_id_created_room: user_id,
    });
    return result;
  }

  async find(email: string, user_id: string) {
    const findDestinationUserId = await this.usersRepository.findUserByEmail({
      email,
    });

    if (!findDestinationUserId) {
      throw new HttpException(400, 'User not found');
    }

    const findRoom = await this.roomsRepository.find({
      user_id_joined_room: findDestinationUserId.id,
      user_id_created_room: user_id,
    });

    return findRoom;
  }
  async getRooms(user_id: string, number: number, size: number) {
    const result = await this.roomsRepository.findAllRooms(
      user_id,
      number,
      size,
    );

    const roomsWithDetails = await Promise.all(
      result.map(async (room) => {
        const otherUser =
          room.user_id_created_room.find((id) => id.toString() !== user_id) ||
          room.user_id_joined_room.find((id) => id.toString() !== user_id);

        if (otherUser) {
          const userDetails = await this.usersRepository.findUserById({
            id: otherUser.toString(),
          });

          const lastMessage = await this.messagesRepository.getLastMessage(
            room._id.toString(),
          );

          const countUnreadMessages =
            await this.messagesRepository.countUnreadmessages(
              room._id.toString(),
              user_id,
              otherUser.toString(),
            );
          return {
            room,
            toUserMessage: {
              name: userDetails[0].name,
              email: userDetails[0].email,
              avatar_url: userDetails[0].avatar_url,
              _id: userDetails[0]._id,
              createdAt: userDetails[0].createdAt,
            },
            lastMessage: lastMessage[0],
            count: countUnreadMessages,
          };
        }
      }),
    );
    return roomsWithDetails;
  }
}
export { Rooms };
