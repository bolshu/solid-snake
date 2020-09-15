import { TScoreValue } from '../../types';
import COLORS from '../colors';
import AbstractComponent from './AbstractComponent';

export type TScoreArg = {
  score: TScoreValue;
};

class Score extends AbstractComponent<TScoreValue> {
  public draw(score: TScoreValue): void {
    this.context.font = `${this.cellSize / 2}px monospace`;
    this.context.fillStyle = COLORS.STROKE;
    this.context.textAlign = 'left';
    this.context.fillText(`Score: ${score}`, this.cellSize, 30);
  }
}

export default Score;
