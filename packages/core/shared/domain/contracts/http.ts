export type HttpResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};
export interface HttpService {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    hasBearerAuth?: boolean
  ): Promise<HttpResponse<T>>;
  post<T>(
    url: string,
    data: unknown,
    headers?: Record<string, unknown>,
    hasBearerAuth?: boolean
  ): Promise<HttpResponse<T>>;
  put<T>(
    url: string,
    data: Record<string, unknown>,
    headers?: Record<string, unknown>,
    hasBearerAuth?: boolean
  ): Promise<HttpResponse<T>>;
  patch<T>(
    url: string,
    data?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    hasBearerAuth?: boolean
  ): Promise<HttpResponse<T>>;
  delete<T>(
    url: string,
    headers?: Record<string, unknown>,
    hasBearerAuth?: boolean,
    data?: unknown
  ): Promise<HttpResponse<T>>;
}
