export interface HttpResponse {
  status: number;
  message?: string;
  data: any;
}

export interface HttpRequest {
  body?: any;
}
