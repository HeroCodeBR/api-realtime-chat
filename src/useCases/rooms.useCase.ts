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
      user_id_joined_room: findDestinationUserId._id,
      user_id_created_room: user_id,
    });
    console.log(
      '🚀 ~ file: rooms.useCase.ts:28 ~ Rooms ~ create ~ result:',
      result,
    );
    return result;
  }

  async find(email: string, user_id: string) {
    const findDestinationUserId = await this.usersRepository.findUserByEmail({
      email,
    });
    console.log(
      '🚀 ~ file: rooms.useCase.ts:39 ~ Rooms ~ find ~ findDestinationUserId:',
      findDestinationUserId,
    );

    if (!findDestinationUserId) {
      throw new HttpException(400, 'User not found');
    }

    const findRoom = await this.roomsRepository.find({
      user_id_joined_room: findDestinationUserId._id,
      user_id_created_room: user_id,
    });
    console.log(
      '🚀 ~ file: rooms.useCase.ts:44 ~ Rooms ~ find ~ findRoom:',
      findRoom,
    );

    return findRoom;
  }
  async getRooms(user_id: string, number: number, size: number) {
    const result = await this.roomsRepository.findAllRooms(
      user_id,
      number,
      size,
    );
    console.log(
      '🚀 ~ file: rooms.useCase.ts:53 ~ Rooms ~ getRooms ~ result:',
      result,
    );

    const roomsWithDetails = await Promise.all(
      result.map(async (room) => {
        const otherUser =
          room.user_id_created_room.find((id) => id.toString() !== user_id) ||
          room.user_id_joined_room.find((id) => id.toString() !== user_id);

        if (otherUser) {
          const userDetails = await this.usersRepository.findUserById({
            id: otherUser,
          });

          if (!userDetails) {
            throw new HttpException(400, 'User not found');
          }

          const lastMessage = await this.messagesRepository.getLastMessage(
            room._id.toString(),
          );

          const countUnreadMessages =
            await this.messagesRepository.countUnreadmessages(
              room._id.toString(),
              user_id,
              otherUser,
            );
          const data = {
            room,
            toUserMessage: {
              name: userDetails?.name,
              email: userDetails?.email,
              avatar_url: userDetails?.avatar_url,
              _id: userDetails._id,
              createdAt: userDetails.createdAt,
            },
            lastMessage: lastMessage,
            count: countUnreadMessages,
          };

          return {
            room,
            toUserMessage: {
              name: userDetails.name,
              email: userDetails.email,
              avatar_url: userDetails.avatar_url,
              _id: userDetails._id,
              createdAt: userDetails.createdAt,
            },
            lastMessage: lastMessage,
            count: countUnreadMessages,
          };
        }
      }),
    );

    return roomsWithDetails;
  }
}
export { Rooms };
