import axios from "axios";

let axiosInstance = (token) => {
  const config = { headers: { "Content-Type": "application/json" } };

  if (token) {
    config.headers["Authorization"] = `Bearer:${token}`;
  }
  return axios.create(config);
};

export default axiosInstance;
