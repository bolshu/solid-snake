import { TContext } from '../Canvas';

abstract class Contexted {
  protected readonly context: TContext;

  constructor(context: TContext) {
    this.context = context;
  }
}

export default Contexted;
