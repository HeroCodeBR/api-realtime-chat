import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://herocode:HM9CrAn423GXDNQd@cluster0.t6hmb.mongodb.net/realtime',
    );
  } catch (error) {
    console.log('Erro ao conectar no banco de dados.', error);
  }
}
