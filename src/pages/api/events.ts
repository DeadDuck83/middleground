import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { event } = req.body;

    try {
      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );
      const db = client.db();
      await db.collection('events').insertOne(event);
      client.close();

      res.status(201).json({ message: 'Event added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to insert event.' });
    }
  }
}
