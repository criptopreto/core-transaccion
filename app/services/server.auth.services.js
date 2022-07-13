import Axios from "../lib/fetch";

export async function signin(data) {
  let response = await Axios("POST", "/auth/signin", data);
  if (response && response.success) {
    return response;
  }
  return null;
}

export async function getUser(token) {
  let response = await Axios(
    "GET",
    "/user/",
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );
  if (response) {
    return response;
  }
  return null;
}
