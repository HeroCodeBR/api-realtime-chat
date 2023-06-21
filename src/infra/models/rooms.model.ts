import mongoose from 'mongoose';

const roomsSchema = new mongoose.Schema({
  _id: {
    require: true,
    auto: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  user_id_created_room: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  ],
  user_id_joined_room: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
});

export const RoomsModel = mongoose.default.model('Rooms', roomsSchema);
