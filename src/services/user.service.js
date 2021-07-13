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
  getProductyId(id) {

    return axios.get(API_URL + 'products/'+id, { headers: authHeader() });
  }

  getOrders() {
    return axios.get(API_URL + 'orders', { headers: authHeader() });
  }

  getImages() {
    return axios.get(API_URL + 'image-setup', { headers: authHeader() });
  }
  async updateProductsById(id, updatedObject) {
   try {
      await axios.patch(API_URL + 'products/' + id, updatedObject, { headers: authHeader() });
    } 
    catch (error) {
        // Error 😨
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
    }
  }
    //res.data.headers['Content-Type']; //application/json;charset=utf-8
  }
}

export default new UserService();