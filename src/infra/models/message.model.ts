import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  _id: {
    require: true,
    auto: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  to_user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  body: String,
  from_user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  viewed_by_the_user: Boolean,
});

export const MessageModel = mongoose.default.model('Message', messageSchema);
