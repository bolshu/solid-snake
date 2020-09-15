import { TScoreValue } from '../../types';
import COLORS from '../colors';
import AbstractComponent from './AbstractComponent';

export type TScoreArg = {
  score: TScoreValue;
};

class Score extends AbstractComponent<TScoreValue> {
  public draw(score: TScoreValue): void {
    this.context.font = '30px monospace';
    this.context.fillStyle = COLORS.STROKE;
    this.context.textAlign = 'left';
    this.context.fillText(`Score: ${score}`, 40, 30);
  }
}

export default Score;
