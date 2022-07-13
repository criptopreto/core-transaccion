import axios from "axios";
import jwt from "jsonwebtoken";

class AuthService {
  login(username, password) {
    return axios
      .post(`/api/auth/signin`, { username, password })
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.success) {
            localStorage.setItem("token", response.data.token);
            return true;
          }
        }
        return false;
      })
      .catch((error) => {
        console.log("LOGIN:", error);
        return false;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  isValidToken() {
    const token = localStorage.getItem("token");
    let valid = false;

    if (token) {
      let decoded = jwt.decode(token);
      if (decoded.exp * 1000 >= Date.now()) valid = true;
    }
    return valid;
  }

  getCurrentUser() {
    const token = localStorage.getItem("token");
    if (token) {
      let decoded = jwt.decode(token);
      return decoded.user;
    }
    return {};
  }
}

export default new AuthService();
