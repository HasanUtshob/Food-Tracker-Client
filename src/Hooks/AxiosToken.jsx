import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const AxiosInstense = axios.create({
  baseURL: "http://localhost:3000/",
});

const AxiosToken = () => {
  const { User } = use(AuthContext);

  AxiosInstense.interceptors.request.use((Config) => {
    Config.headers.authorization = `Bearer ${User.accessToken}`;
    return Config;
  });

  return AxiosInstense;
};

export default AxiosToken;
