import { TCoordinates } from '../../types';
import COLORS from '../colors';
import AbstractCelledComponent from './AbstractCelledComponent';

class Snake extends AbstractCelledComponent<TCoordinates[]> {
  public draw(coordinates: TCoordinates[]): void {
    coordinates.forEach(([col, row], i) => {
      const fill = i === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE;

      this.drawCell(
        this.cellSize * col,
        this.cellSize * row,
        this.cellSize,
        this.cellSize,
        fill,
      );
    });
  }
}

export default Snake;
