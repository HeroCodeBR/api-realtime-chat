import { MessageModel } from '../infra/models/message.model';
import { IMessage } from '../interfaces/message.interface';

class MessageRepository {
  async create({ to_user_id, from_user_id, bodyMessage, room_id }: IMessage) {
    const result = await MessageModel.create({
      to_user_id,
      from_user_id,
      body: bodyMessage,
      viewed_by_the_user: false,
      room_id,
    });
    return result;
  }
  async findMessagesRoom(room_id: string, user_id: string, to_user_id: string) {
    const result = await MessageModel.find({
      room_id,
      from_user_id: user_id,
      to_user_id,
      viewed_by_the_user: false,
    });
    return result;
  }
  async getLastMessage(room_id: string) {
    const result = await MessageModel.find({ room_id: room_id })
      .sort({ createdAt: -1 })
      .limit(1);
    return result;
  }
  async countUnreadmessages(
    room_id: string,
    user_id: string,
    user_destinatary: string,
  ) {
    const result = await MessageModel.find({
      room_id,
      from_user_id: user_id,
      to_user_id: user_destinatary,
      viewed_by_the_user: false,
    }).countDocuments();
    return result;
  }
  async updateMessage(room_id: string, user_id: string, to_user_id: string) {
    const result = await MessageModel.updateMany(
      {
        room_id,
        from_user_id: user_id,
        to_user_id,
        viewed_by_the_user: false,
      },
      {
        $set: { viewed_by_the_user: true },
      },
    );
    console.log(
      '🚀 ~ file: message.repository.ts:39 ~ MessageRepository ~ updateMessage ~ result:',
      result,
    );
    return result;
  }
}

export { MessageRepository };
