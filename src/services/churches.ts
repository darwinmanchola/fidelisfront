import api from './api';

export const listChurches = async () => {
    const response  = await api.get('/churches/');
   if (response.status !== 200) {
    throw new Error('Error fetching churches');

  }
    return response.data;
  };