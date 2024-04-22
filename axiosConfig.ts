import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { Session } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { getSession, signOut } from "next-auth/react";
import { NextRouter } from "next/router";

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const createAxiosInstance = (router: NextRouter): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const session: any | Session = await getSession();

      if  (!config?.url?.endsWith("/login") && !config?.url?.endsWith("/signup"))  {
        if (session?.user?.jwt)
          config.headers["Authorization"] = `Bearer ${session?.user?.jwt}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // You can modify the response before it is returned
      return response;
    },
    async (error: AxiosError) => {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Status code:", error.response.status);

        // Handle specific status codes or error conditions if needed
        if (error.response.status === 401) {
          alert('Token Expired, Please Log In again');
          signOut();

          console.log("commmon!!");
          // Handle unauthorized access
        } else if (error.response.status === 404) {
          console.log("commmon!!");

          // Handle not found error
        } else {
          console.log("commmon!!");

          // Handle other status codes or generic errors
        }
      } else if (error.request) {
        console.log("commmon!!");

        // The request was made but no response was received
        console.error("Request error:", error.request);
      } else {
        console.log("commmon!!");

        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }

      // Return the rejected promise to maintain the error flow
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
