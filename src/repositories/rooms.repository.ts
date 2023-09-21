import mongoose from 'mongoose';
import { RoomsModel } from '../infra/models/rooms.model';
import { ICreate, IRoom } from '../interfaces/rooms.interface';

class RoomsRepository {
  async create({
    user_id_joined_room,
    user_id_created_room,
  }: ICreate): Promise<IRoom> {
    const result = await RoomsModel.create({
      user_id_joined_room,
      user_id_created_room,
    });
    return result.toObject();
  }
  async find({
    user_id_joined_room,
    user_id_created_room,
  }: ICreate): Promise<IRoom | null> {
    const result = await RoomsModel.find({
      user_id_created_room,
      user_id_joined_room,
    });
    console.log(
      '🚀 ~ file: rooms.repository.ts:24 ~ RoomsRepository ~ result:',
      result,
    );

    return result.length > 0 ? result[0].toObject() : null;
  }
  async findAllRooms(
    user_id: string,
    number: number,
    size: number,
  ): Promise<IRoom[]> {
    const query = {
      $or: [
        { user_id_created_room: new mongoose.Types.ObjectId(user_id) },
        {
          user_id_joined_room: new mongoose.Types.ObjectId(user_id),
        },
      ],
    };
    const result = await RoomsModel.find(query);
    return result ? result.map((room) => room && room.toObject()) : [];
  }
}

export { RoomsRepository };
