import axios from 'axios';
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";



const clienteAxios = axios.create({
  baseURL: 'http://localhost:8080/consultorio/'
});

clienteAxios.interceptors.request.use(async (request) => {

  const token = localStorage.getItem("token")
  // console.log('token interceptor ', token)

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;

    const decodeAccessToken = jwt_decode(token);

    const accessTokenisExpired =
      dayjs.unix(decodeAccessToken.exp).diff(dayjs()) < 1;
    // console.log('dentro del interceptor reques token ', request)
    // console.log('accessTokenisExpired ', accessTokenisExpired)
    if (!accessTokenisExpired) return request;
    // localStorage.removeItem("token");

  }
  return request;
}, (error) => {
  // Do something with request error
  console.error('interceptors.request.error: ', error);
  return Promise.reject(error);
})


export default clienteAxios;