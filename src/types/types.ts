export type EventData = {
  title: string;
  link?: string;
  preferences?: { name: string; type: string }[];
  destinations?: string[] | null | undefined;
  creator: {
    name: string;
    avatar: string;
    lat: number;
    lng: number;
  };
  attendees: {
    name: string;
    avatar: string;
    lat: number;
    lng: number;
  }[];
  eventID: string;
};

export type CreateEvent = {
  title: string;
  eventID: string;
  link?: string;
  creator: {
    name: string;
    avatar: string;
    lat: number;
    lng: number;
  };
};

export type AddUser = {
  name: string;
  avatar: string;
  lat: number;
  lng: number;
};

export type AddPreferences = {
  name: string;
  type: string;
};
