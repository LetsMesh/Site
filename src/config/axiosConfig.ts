import axios from "axios";

/*
base URL is configured such that
when using axios to contact django endpoint -> http://localhost:8001/api/user/reset
set http request endpoint to -> user/reset

to use axios, import instance as such: 
import { axiosInstance } from './config/axiosConfig'
then you can make calls as such -> axiosInstance.get(), axiosInstance.post(), etc
*/
const baseURL: string = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:8000/api/';

export const axiosInstance = axios.create({
    baseURL: baseURL,
  });