import axios from 'axios';
import { HttpInterceptor } from '../../domain/contracts/http-interceptor';

export function axiosHttpInterceptorBuilder(): HttpInterceptor {
  return {
    interceptResponse(callback: (status: number, url: string) => void): void {
      axios.interceptors.response.use(
        function (response) {
          callback(response.status, response.config.url || '');
          return response;
        },
        function (error) {
          callback(error.response.status, error.response.config.url || '');
          return Promise.reject(error);
        }
      );
    }
  };
}
