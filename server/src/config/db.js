import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

/** Reuse MongoDB connection across Vercel serverless invocations */
async function connectWithCache(uri) {
  const preferred = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/terranode';

  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }

  const cache = global.mongooseCache;

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    mongoose.set('strictQuery', true);
    cache.promise = mongoose
      .connect(preferred, { serverSelectionTimeoutMS: 10000 })
      .then((conn) => {
        console.log(`MongoDB connected: ${conn.connection.host}`);
        cache.conn = conn;
        return conn;
      });
  }

  return cache.promise;
}

export async function connectDB(uri) {
  const preferred = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/terranode';

  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    try {
      return await connectWithCache(preferred);
    } catch (err) {
      if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
        throw new Error(`MongoDB required: ${err.message}`);
      }
      throw err;
    }
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(preferred, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (err) {
    console.warn(`MongoDB unavailable (${err.message}). Starting in-memory database.`);
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri('terranode');
  await mongoose.connect(memoryUri);
  console.log('In-memory MongoDB ready (data resets when server stops).');
  return mongoose.connection;
}
