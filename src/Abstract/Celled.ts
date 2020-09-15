import { TContext } from '../Canvas';
import Drawned, { TDrawArgs } from './Drawned';

export type TCellSize = number;

abstract class Celled<T = TDrawArgs> extends Drawned<T> {
  protected readonly cellSize: TCellSize;

  protected readonly lineWidth: number = 1;

  constructor(context: TContext, cellSize: TCellSize) {
    super(context);
    this.cellSize = cellSize;
  }
}

export default Celled;
