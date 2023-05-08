import { CreateEvent } from '@/types/types';
import axios from 'axios';

export const createEvent = async (eventData: CreateEvent) => {
  const response = await axios.post('/api/events', eventData);
  return response.data;
};
