// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  title: string;
  link: string;
  preferences: string[];
  destinations: string[];
  attendees: {
    name: string;
    avatar: string;
  }[];
  eventID: string;
  creator: {
    name: string;
    avatar: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    title: 'The 5th Wave',
    link: 'www.google.com',
    preferences: ['action', 'adventure', 'sci-fi'],
    destinations: ['test', 'test2', 'test3'],
    attendees: [
      {
        name: 'John',
        avatar: 'https://avatars.dicebear.com/api/bottts/john.svg',
      },
      {
        name: 'Candy',
        avatar: 'https://avatars.dicebear.com/api/pixel-art/candy.svg',
      },
    ],
    eventID: '1234567890',
    creator: {
      name: 'Timmy',
      avatar: 'https://avatars.dicebear.com/api/human/timmy.svg',
    },
  });
}
