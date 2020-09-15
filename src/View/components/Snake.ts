import { TCoordinates } from '../../types';
import COLORS from '../colors';
import AbstractCelledComponent from './AbstractCelledComponent';

class Snake extends AbstractCelledComponent<TCoordinates[]> {
  public draw(coordinates: TCoordinates[]): void {
    coordinates.forEach(([col, row], i) => {
      const x = this.cellSize * col;
      const y = this.cellSize * row;
      const w = this.cellSize;
      const h = this.cellSize;

      this.context.fillStyle = i === 0 ? COLORS.RED : COLORS.TOMATO;
      this.context.fillRect(x, y, w, h);

      this.context.strokeStyle = COLORS.WHITE;
      this.context.lineWidth = this.lineWidth;
      this.context.strokeRect(x, y, w, h);
    });
  }
}

export default Snake;
