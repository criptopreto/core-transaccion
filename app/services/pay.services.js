import axios from "axios";

let url = "/api";
export const findUserByPaymentMethod = async (data) => {
  let endpoint = `${url}/pay/get_user_payment`;
  return axios
    .post(endpoint, { payment_method: data })
    .then((res) => {
      if (res.status === 200)
        return { user: res.data.user, type: res.data.type };
      return null;
    })
    .catch((err) => {
      return null;
    });
};
