import { MessageModel } from '../infra/models/message.model';
import { IGetLastMessage, IMessage } from '../interfaces/message.interface';

class MessageRepository {
  async create({
    to_user_id,
    from_user_id,
    bodyMessage,
    room_id,
  }: IMessage): Promise<IMessage> {
    const result = await MessageModel.create({
      to_user_id,
      from_user_id,
      body: bodyMessage,
      viewed_by_the_user: false,
      room_id,
    });
    return result.toObject();
  }
  async findMessagesRoom(
    room_id: string,
    user_id: string,
    to_user_id: string,
  ): Promise<IMessage | null> {
    const result = await MessageModel.find({
      room_id,
      from_user_id: user_id,
      to_user_id,
      viewed_by_the_user: false,
    });
    return result ? result[0].toObject() : null;
  }
  async getLastMessage(room_id: string): Promise<IMessage | null> {
    const result = await MessageModel.find({ room_id: room_id })
      .sort({ createdAt: -1 })
      .limit(1);
    return result ? result[0].toObject() : null;
  }
  async countUnreadmessages(
    room_id: string,
    user_id: string,
    user_destinatary: string,
  ): Promise<number> {
    const result = await MessageModel.find({
      room_id,
      from_user_id: user_id,
      to_user_id: user_destinatary,
      viewed_by_the_user: false,
    }).countDocuments();
    return result;
  }
  async updateMessage(
    room_id: string,
    user_id: string,
    to_user_id: string,
  ): Promise<boolean> {
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

    return result ? true : false;
  }
  async getHistoric({
    userId,
    userIdDestinatary,
    pageNumber,
  }: IGetLastMessage): Promise<IMessage[]> {
    const query = {
      $or: [
        {
          to_user_id: userId,
          from_user_id: userIdDestinatary,
        },
        {
          to_user_id: userIdDestinatary,
          from_user_id: userId,
        },
      ],
    };
    const result = await MessageModel.find(query)
      .skip((pageNumber - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });
    console.log(
      '🚀 ~ file: message.repository.ts:92 ~ MessageRepository ~ result:',
      result,
    );
    const resultReverse = result.reverse();
    return result ? resultReverse.map((message) => message.toObject()) : [];
  }
}

export { MessageRepository };
