export type EventData = {
  title: string;
  link: string;
  preferences?: string[];
  destinations?: string[];
  attendees?: {
    name: string;
    avatar: string;
  }[];
  eventID: string;
  creator: {
    name: string;
    avatar: string;
  };
};
