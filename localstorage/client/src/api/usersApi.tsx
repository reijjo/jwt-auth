import axios from "axios";
import { Register } from "../utils/types";

const baseURL = "http://localhost:3001/users";

const getAllUsers = async () => {
  const res = await axios.get(`${baseURL}`);
  return res.data;
};

const createUser = async (user: Register) => {
  const res = await axios.post(`${baseURL}`, user);
  return res.data;
};

const usersApi = {
  getAllUsers,
  createUser,
};

export default usersApi;
