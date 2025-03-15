import { IMovementWithouId } from '../../interfaces';

export class MovementCreatedEvent {
  constructor(public readonly data: IMovementWithouId) {}
}
