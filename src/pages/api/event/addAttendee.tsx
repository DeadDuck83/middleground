// pages/api/event/addAttendee.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { AddUser } from '@/types/types';
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
    const { eventID, attendee }: { eventID: string; attendee: AddUser } =
      req.body;

    try {
      await client.connect();
      const database = client.db('events');
      const collection = database.collection('events');

      const event = await collection.findOne({ eventID });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const result = await collection.updateOne(
        { eventID },
        { $push: { attendees: attendee } }
      );

      res.status(200).json({ message: 'Attendee added!' });
    } catch (error) {
      res.status(500).json({ message: 'Adding attendee failed!' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
