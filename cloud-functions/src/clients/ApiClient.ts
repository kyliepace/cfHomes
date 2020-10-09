import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export default class ApiClient {
  baseUrl: string
  constructor(url: string){
    this.baseUrl = url;
  }

  buildQueryString(params: any): string {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  request(method: string, url?: string, params?: any, data?: any): Promise<AxiosResponse> {
    const axiosBody: AxiosRequestConfig = {
      method: method as Method,
      baseURL: this.baseUrl
    };
    if (data){
      axiosBody.data = data;
    }
    if (url){
      axiosBody.url = url;
    }
    if (params){
      axiosBody.params = params;
    }
    return axios.request(axiosBody)
  }

  async get({params, url}: {params: any, url?: string}): Promise<any> {
    const response = await this.request('GET', url, params, undefined);
    return response.data;
  }
}

