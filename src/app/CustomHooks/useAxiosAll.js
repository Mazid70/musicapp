import axios from "axios";
const axiosAll = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LINK,
});

export const useAxiosAll = () => {
  return axiosAll;
 
}

