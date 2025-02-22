export interface IResponse {
  status: boolean;
  message: string;
  data?: any;
}

export interface IResponseUser extends IResponse {
  token: string | null;
}