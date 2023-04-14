

import { resetState } from "../slices/usuarioSlice";
import axiosClient from "./axios";

const SetupInterceptors = async (navigate) => {


  axiosClient.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      // console.log('error ===>>> ', err)
      if (err.response) {
        // console.log('paso el response ===>>> ', err)
        if (err.response.status === 403 || err.response.status === 401) {
          // console.log('entra al SetupInterceptors ')
          resetState()
          localStorage.removeItem('token')
          // console.log('entra al SetupInterceptors sale ')
          navigate("/");
        }
      }

      return Promise.reject(err);
    }
  );
};

export default SetupInterceptors;
