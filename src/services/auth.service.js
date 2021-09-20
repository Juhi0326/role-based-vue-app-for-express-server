import axios from 'axios';

const API_URL = 'http://localhost:8081/users/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {

        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      userName: user.userName,
      email: user.email,
      password: user.password,
      role: user.role
    }).then(response => {
        return response
    }).catch(error => {
      return error.response.data
    });
  }
}

export default new AuthService();