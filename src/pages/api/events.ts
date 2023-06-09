import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { CreateEvent } from '@/types/types';
const uri = process.env.NEXT_PUBLIC_MONGO_URI as string;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const eventData: CreateEvent = req.body;
    try {
      await client.connect();
      const database = client.db('events');
      const collection = database.collection('events');
      const result = await collection.insertOne(eventData);
      res.status(201).json({ message: 'Event created!' });
    } catch (error) {
      res.status(500).json({ message: 'Event creation failed!' });
    }
  }
}
