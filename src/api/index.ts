import axios from 'axios';
import Controllers from './controllers';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
});

const api = new Controllers(instance);

export default api;
