import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

export async function connectDB(uri) {
  mongoose.set('strictQuery', true);
  const preferred =
    uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/terranode';

  try {
    await mongoose.connect(preferred, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return;
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`MongoDB required in production: ${err.message}`);
    }
    console.warn(`MongoDB unavailable (${err.message}). Starting in-memory database.`);
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri('terranode');
  await mongoose.connect(memoryUri);
  console.log('In-memory MongoDB ready (data resets when server stops).');
}
