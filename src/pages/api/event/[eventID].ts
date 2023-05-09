// pages/api/event/[eventID].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';
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
  const { eventID } = req.query;

  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('events');
      const collection = database.collection('events');
      const event = await collection.findOne({ eventID });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json({ event });
    } catch (error) {
      res.status(500).json({ message: 'Fetching event failed!' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
