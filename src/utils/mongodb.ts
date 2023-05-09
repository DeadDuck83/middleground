import { MongoClient, ServerApiVersion } from 'mongodb';

const { NEXT_PUBLIC_MONGO_URI, NEXT_PUBLIC_MONGO_DB } = process.env;
const uri = NEXT_PUBLIC_MONGO_URI as string;
if (!NEXT_PUBLIC_MONGO_URI) {
  throw new Error(
    'Please define the NEXT_PUBLIC_MONGO_URI environment variable inside .env.local'
  );
}

if (!NEXT_PUBLIC_MONGO_DB) {
  throw new Error(
    'Please define the NEXT_PUBLIC_MONGO_DB environment variable inside .env.local'
  );
}
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(NEXT_PUBLIC_MONGO_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
