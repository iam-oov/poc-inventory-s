import { IStoreId } from '../../application/interfaces';
import { IBaseResponse } from './base-reponse.interface';

export interface ICreateStoreResponse extends IBaseResponse {
  data: IStoreId;
}
