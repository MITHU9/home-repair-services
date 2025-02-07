import axios from "axios";
import { useEffect } from "react";
import { useServiceContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://home-repaire-bakcend.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useServiceContext();
  const navigate = useNavigate();

  //interceptors
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log(error.status);

        if (
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 400
        ) {
          console.log("Unauthorized");
          signOutUser()
            .then(() => {
              console.log("User signed out");
              navigate("/auth/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
