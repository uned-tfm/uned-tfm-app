import { axiosHttpInterceptorBuilder } from './axios-http-interceptor/axios-http-interceptor';
import { axiosHttpServiceBuilder } from './axios-http-service/axios-http-service';
import { localstorageStorageRepositoryBuilder } from './localstorage-storage-repository/localstorage-storage-repository';

export const storageRepository = localstorageStorageRepositoryBuilder();
export const httpService = axiosHttpServiceBuilder({ storageRepository });
export const httpInterceptor = axiosHttpInterceptorBuilder();
