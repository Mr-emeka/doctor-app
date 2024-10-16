import client from './client';
// const client = apiClient;

const endpoint = '/specialty';

const getSpecialties = () => {
  return client.get(`${endpoint}`);
};



export default {
    getSpecialties
};
