import { TransferInventoryDto } from '../../dtos';

export class TransferInventoryCommand {
  constructor(public readonly transferInventoryDto: TransferInventoryDto) {}
}
