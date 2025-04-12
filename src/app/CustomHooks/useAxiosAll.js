import axios from "axios";
const axiosAll = axios.create({
  baseURL: 'http://localhost:3000',
});

export const useAxiosAll = () => {
  return axiosAll;
 
}

