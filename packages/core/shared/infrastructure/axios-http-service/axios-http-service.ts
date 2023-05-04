import axios from 'axios';
import { isNil } from '../../../utils/type-checkers';
import { HttpResponse, HttpService } from '../../domain/contracts/http';
import { StorageKeys, StorageRepository } from '../../domain/contracts/storage.repository';
import { UserValidationError } from '../../domain/errors';

export function axiosHttpServiceBuilder({
  storageRepository
}: {
  storageRepository: StorageRepository;
}): HttpService {
  function addOrigenBearerAuthToHeaders(headers: Record<string, string> = {}) {
    try {
      const jwt = storageRepository.getItem(StorageKeys.JWT);

      if (isNil(jwt)) {
        throw new UserValidationError();
      }

      return {
        ...headers,
        Authorization: `Bearer ${jwt}`
      };
    } catch (err) {
      return { ...headers };
    }
  }

  return {
    async get<ItemType>(
      url: string,
      params?: Record<string, string>,
      headers?: Record<string, string>,
      hasBearerAuth = false
    ): Promise<HttpResponse<ItemType>> {
      if (hasBearerAuth) {
        headers = addOrigenBearerAuthToHeaders(headers);
      }

      return axios.get<ItemType>(url, { headers, params });
    },
    async post<ItemType>(
      url: string,
      data: unknown,
      headers?: Record<string, string>,
      hasBearerAuth = false
    ): Promise<HttpResponse<ItemType>> {
      if (hasBearerAuth) {
        headers = addOrigenBearerAuthToHeaders(headers);
      }

      return axios.post(url, data, { headers });
    },
    async put<ItemType>(
      url: string,
      data: Record<string, unknown>,
      headers?: Record<string, string>,
      hasBearerAuth = false
    ): Promise<HttpResponse<ItemType>> {
      if (hasBearerAuth) {
        headers = addOrigenBearerAuthToHeaders(headers);
      }

      return axios.put(url, data, { headers });
    },
    async patch<ItemType>(
      url: string,
      data?: Record<string, unknown>,
      headers?: Record<string, string>,
      hasBearerAuth = false
    ): Promise<HttpResponse<ItemType>> {
      if (hasBearerAuth) {
        headers = addOrigenBearerAuthToHeaders(headers);
      }

      return axios.patch(url, data, { headers });
    },
    async delete<ItemType>(
      url: string,
      headers?: Record<string, string>,
      hasBearerAuth = false,
      data?: unknown
    ): Promise<HttpResponse<ItemType>> {
      if (hasBearerAuth) {
        headers = addOrigenBearerAuthToHeaders(headers);
      }

      return axios.delete(url, { headers, data });
    }
  };
}
