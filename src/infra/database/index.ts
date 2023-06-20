import mongoose from 'mongoose';
export async function connect() {
  if (!process.env.MONGO_DB_HOST) {
    throw new Error('.env not found');
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_HOST);
  } catch (error) {
    console.log('Erro ao conectar no banco de dados.', error);
  }
}
