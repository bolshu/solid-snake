import { TCoordinates } from '../../types';
import COLORS from '../colors';
import AbstractCelledComponent from './AbstractCelledComponent';

class Apple extends AbstractCelledComponent<TCoordinates> {
  public draw([col, row]: TCoordinates): void {
    this.drawCell(
      this.cellSize * col,
      this.cellSize * row,
      this.cellSize,
      this.cellSize,
      COLORS.TOMATO,
    );
  }
}

export default Apple;
