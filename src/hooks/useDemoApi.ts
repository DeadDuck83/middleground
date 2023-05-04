// hooks/useDemoApi.ts
import { useQuery } from 'react-query';
import apiClient from '../lib/apiClient';

const fetchDemoApi = async () => {
  const { data } = await apiClient.get('/demo');
  return data;
};

export function useDemoApi() {
  const queryResults = useQuery('demoApi', fetchDemoApi);
  return {
    ...queryResults,
    // we can text the loading state by changing the value of isLoading
    // isLoading: false,
    // isError: true
  };
}
