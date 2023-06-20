import mongoose from 'mongoose';
import { HttpException } from '../../interfaces/HttpException';
export async function connect() {
  if (!process.env.MONGO_DB_HOST) {
    throw new HttpException(498, '.env not found');
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_HOST);
  } catch (error) {
    console.log('Erro ao conectar no banco de dados.', error);
  }
}
