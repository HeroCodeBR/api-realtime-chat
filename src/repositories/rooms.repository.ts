import { RoomsModel } from '../infra/models/rooms.model';
import { ICreate } from '../interfaces/rooms.interface';

class RoomsRepository {
  async create({ user_id_joined_room, user_id_created_room }: ICreate) {
    const result = await RoomsModel.create({
      user_id_joined_room,
      user_id_created_room,
    });
    return result;
  }
  async find({ user_id_joined_room, user_id_created_room }: ICreate) {
    const result = await RoomsModel.find({
      user_id_created_room,
      user_id_joined_room,
    });

    return result;
  }
}

export { RoomsRepository };
