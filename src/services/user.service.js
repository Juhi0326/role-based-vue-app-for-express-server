import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/';

class UserService {
  getHomePage() {
    return axios.get(API_URL + 'home');
  }

  getProducts() {

    return axios.get(API_URL + 'products', { headers: authHeader() });
  }

  getOrders() {
    return axios.get(API_URL + 'orders', { headers: authHeader() });
  }

  getImages() {
    return axios.get(API_URL + 'image-setup', { headers: authHeader() });
  }
}

export default new UserService();