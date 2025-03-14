import { IBaseResponse } from './base-reponse.interface';

export interface IProductIdResponse extends IBaseResponse {
  data: { id: number };
}
