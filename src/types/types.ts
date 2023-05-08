export type EventData = {
  title: string;
  link?: string;
  preferences?: { name: string; type: string }[];
  destinations?: string[] | null | undefined;
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

export type CreateEvent = {
  title: string;
  eventID: string;
  link?: string;
  creator: {
    name: string;
    avatar: string;
  };
};

export type AddUser = {
  name: string;
  avatar: string;
};

export type AddPreferences = {
  name: string;
  type: string;
};
