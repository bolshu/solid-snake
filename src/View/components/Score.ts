import { TScoreValue } from '../../types';
import COLORS from '../colors';
import AbstractComponent from './AbstractComponent';

class Score extends AbstractComponent<TScoreValue> {
  public draw(score: TScoreValue): void {
    this.context.font = '30px Comic Sans MS';
    this.context.fillStyle = COLORS.WHITE;
    this.context.textAlign = 'left';
    this.context.fillText(score.toString(), 0, 0);
  }
}

export default Score;
