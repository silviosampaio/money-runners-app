import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__
    ? 'http://192.168.1.71:8000'
    : 'http://money-runners-ws.herokuapp.com',
});

export default api;
