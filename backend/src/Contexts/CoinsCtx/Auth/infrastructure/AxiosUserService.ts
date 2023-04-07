// import axios, {AxiosInstance} from "axios";
import {UserService} from "../application/UserService";

export class AxiosUserService implements UserService {
  // private readonly axiosInstance: AxiosInstance;

  constructor() {
    // this.axiosInstance = axios.create({
    //   baseURL: "http://localhost:3000/api/",
    // });
  }

  async register(): Promise<void> {
    console.log('registered')
    // const response = await this.axiosInstance.post('auth/register', {
    //   email: 'marcelo@fake.com',
    //   username: 'marce-ldv',
    //   password: '12345',
    // })
    // console.log(response)


  }
}
