import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000/api' });

export const shortenUrl = (originalUrl) => API.post('/shorten', { originalUrl });
export const getAnalytics = () => API.get('/analytics/all');
export const getUrl=(id)=> API.get(`/${id}`);