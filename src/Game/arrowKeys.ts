export type TDirectonKeys = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type TDirectonValues = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

const ARROW_KEYS: Record<TDirectonKeys, TDirectonValues> = {
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
};

export default ARROW_KEYS;
