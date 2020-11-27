import axios from 'axios';

const api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: { authorization: 'Apikey 1b77159fd738954a7062f9ac985943cc43c326c63b70cec8613ebb96d36b3468' },
});

export default api;