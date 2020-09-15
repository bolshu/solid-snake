import { TContext } from '../types';

abstract class AbstractComponent<D> {
  protected readonly context: TContext;

  constructor(context: TContext) {
    this.context = context;
  }

  abstract draw(args?: D): void;
}

export default AbstractComponent;
