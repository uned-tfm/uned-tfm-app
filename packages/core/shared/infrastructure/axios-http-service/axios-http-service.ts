import axios from 'axios';
import { HttpResponse, HttpService } from '../../domain/contracts/http';

export function axiosHttpServiceBuilder(): HttpService {
  return {
    async get<ItemType>(
      url: string,
      params?: Record<string, string>,
      headers?: Record<string, string>
    ): Promise<HttpResponse<ItemType>> {
      return axios.get<ItemType>(url, { headers, params });
    },
    async post<ItemType>(
      url: string,
      data: unknown,
      headers?: Record<string, string>
    ): Promise<HttpResponse<ItemType>> {
      return axios.post(url, data, { headers });
    },
    async put<ItemType>(
      url: string,
      data: Record<string, unknown>,
      headers?: Record<string, string>
    ): Promise<HttpResponse<ItemType>> {
      return axios.put(url, data, { headers });
    },
    async patch<ItemType>(
      url: string,
      data?: Record<string, unknown>,
      headers?: Record<string, string>
    ): Promise<HttpResponse<ItemType>> {
      return axios.patch(url, data, { headers });
    },
    async delete<ItemType>(
      url: string,
      headers?: Record<string, string>,
      data?: unknown
    ): Promise<HttpResponse<ItemType>> {
      return axios.delete(url, { headers, data });
    }
  };
}
