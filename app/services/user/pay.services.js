import axios from "axios";

class PayService {
  async send_pay(payment_data) {
    return await axios
      .post(`/api/pay/send_pay`, { payment_data })
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.success) {
            console.log("PAY:", response.data);
            return response?.data.data;
          }
        }
        return false;
      })
      .catch((error) => {
        return false;
      });
  }
}

export default new PayService();
