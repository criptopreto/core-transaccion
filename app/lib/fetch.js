import axios from "axios";

export function get_endpoint(endpoint) {
  return `${process.env.API_URL}${endpoint}`;
}

export default async function Axios(method, endpoint, data, req_headers = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...req_headers,
  };
  let url = get_endpoint(endpoint);
  const config = {
    method,
    url,
    headers,
    data,
  };
  try {
    const response = await axios(config);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
