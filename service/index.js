import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.120:1000/'
});

export default api;