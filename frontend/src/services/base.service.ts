// base.service.ts

import axios, { CancelTokenStatic, CancelTokenSource } from "axios";
import Cookies from "js-cookie";
import { EUN_AUTH_ROUTES } from "../enums/routes.enum";

// import { UN_AUTHENTICATED_ROUTES } from "../constants/routes";

const Config = process.env.NEXT_PUBLIC_API_URL;
console.log(Config, "Config");

export class HttpService {
  CancelToken: CancelTokenStatic;
  source: CancelTokenSource;

  constructor() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
    if (HttpService.getToken()) {
      axios.defaults.headers[
        "Authorization"
      ] = `Bearer ${HttpService.getToken()}`;
    }
    axios.interceptors.response.use(undefined, function (error: any) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        HttpService.clearCookie();
        localStorage.clear();
        window.location.href = EUN_AUTH_ROUTES.LOGIN as string;
      }

      return Promise.reject(error);
    });
  }

  /**
   * Set Token On Header
   * @param token
   */
  static setToken(token: string): void {
    axios.defaults!.headers!["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Retrieves the token from the cookies.
   * @returns {string | undefined} The token value if found, otherwise undefined.
   */
  static getToken(): string {
    return Cookies.get("token") ?? "";
  }

  static clearCookie() {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("fullName");
  }

  /**
   * Sets a cookie with the specified name and value.
   * @param {string} name The name of the cookie.
   * @param {string} value The value to be stored in the cookie.
   */
  static setCookie(name: string, value: string): void {
    Cookies.set(name, value, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
  }
  /**
   * Fetch data from server
   * @param url Endpoint link
   * @return Promise
   */
  protected get = async (url: string, params?: any): Promise<any> => {
    const res = await axios.get(`${Config}/${url}`, {
      params,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  /**
   * Write data over server
   * @param url Endpoint link
   * @param body Data to send over server
   * @return Promise
   */
  protected post = async (
    url: string,
    body?: any,
    options = {}
  ): Promise<any> => {
    const res = await axios.post(`${Config}/${url}`, body, {
      ...options,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  /**
   * Delete Data From Server
   * @param url Endpoint link
   * @param params Embed as query params
   * @return Promise
   */
  protected delete = async (
    url: string,
    params?: any,
    data?: any
  ): Promise<any> => {
    const res = await axios.delete(`${Config}/${url}`, { params, data });
    return res.data;
  };

  /**
   * Update data on server
   * @param url Endpoint link
   * @param body Data to send over server
   * @param params Embed as query params
   * @return Promise
   */
  put = async (url: string, body?: any, params?: any): Promise<any> => {
    const res = await axios.put(`${Config}/${url}`, body, {
      ...params,
      cancelToken: this.source.token,
    });
    return res.data;
  };

  private updateCancelToken() {
    this.source = this.CancelToken.source();
  }

  cancel = () => {
    this.source.cancel("Explicitly cancelled HTTP request");
    this.updateCancelToken();
  };
}
