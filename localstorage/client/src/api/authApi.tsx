import axios from "axios";
import { Login } from "../utils/types";

const baseURL = "http://localhost:3001/auth";

const login = async (user: Login) => {
  const res = await axios.post(`${baseURL}/login`, user);
  return res.data;
};

const verify = async (token: string | null) => {
  const res = await axios.get(`${baseURL}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const authApi = {
  login,
  verify,
};

export default authApi;
