export interface IResponse<T = null> {
  statusCode: string;
  message: string;
  payload: T;
}
