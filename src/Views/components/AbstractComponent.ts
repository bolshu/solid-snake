import { TContext } from '../types';

type TCellSize = number;

abstract class AbstractComponent<D> {
  protected readonly context: TContext;

  protected readonly cellSize: TCellSize = 40;

  constructor(context: TContext) {
    this.context = context;
  }

  abstract draw(args?: D): void;
}

export default AbstractComponent;
