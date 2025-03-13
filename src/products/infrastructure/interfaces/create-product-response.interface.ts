import { IBaseResponse } from './base-reponse.interface';

export interface ICreateProductResponse extends IBaseResponse {
  data: { id: number };
}
