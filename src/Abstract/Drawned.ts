import Contexted from './Contexted';

export type TDrawArgs = void;

abstract class Drawned<T = TDrawArgs> extends Contexted {
  abstract draw(arg?: T): void;
}

export default Drawned;
