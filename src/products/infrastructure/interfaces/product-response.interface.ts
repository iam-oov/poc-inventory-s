import { IProduct } from '../../application/interfaces';
import { IBaseResponse } from './base-reponse.interface';

export interface IProductResponse extends IBaseResponse {
  data: IProduct[];
}
