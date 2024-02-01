import axios from "axios";

/*
Base URL is configured such that when you are using Axios to contact django endpoint -> 'http://localhost:8001/user/reset'
You will need pass this request endpoint into axios call -> 'user/reset'

To use axios with your form, import instance as such: 

import { axiosInstance } from './config/axiosConfig'

Then you can make calls as such -> axiosInstance.get(), axiosInstance.post(), etc

For more detailed explanation dive into the documentation: https://axios-http.com/docs/example
*/

export const BASE_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8000";

export const apiAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true, // Important for cookies to be sent
});
