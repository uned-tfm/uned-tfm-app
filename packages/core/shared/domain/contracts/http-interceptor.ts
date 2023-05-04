export interface HttpInterceptor {
  interceptResponse(callback: (status: number, url: string) => void): void;
}
