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

  request(method: string, requestInfo: {data?: any, url?: string, params?: any}): Promise<AxiosResponse> {
    const fullUrl = `${this.baseUrl}`;
    if (requestInfo?.url){
      fullUrl.concat(requestInfo.url)
    }
    console.log(fullUrl)
    const axiosBody: AxiosRequestConfig = {
      method: method as Method,
      url: fullUrl,
      ...requestInfo
    };
    return axios.request(axiosBody)
  }

  async get(requestInfo?: { params?: any, url?: string}): Promise<any> {
    const response = await this.request('GET', requestInfo);
    return response.data;
  }
}

