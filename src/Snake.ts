import Colors from './colors';
import Celled from './Abstract/Celled';

type TRow = number;
type TCol = number;
export type TPosition = [TRow, TCol][];

class Snake extends Celled<TPosition> {
  public draw(coordinates: TPosition): void {
    coordinates.forEach(([col, row], i) => {
      const x = this.cellSize * col;
      const y = this.cellSize * row;
      const w = this.cellSize;
      const h = this.cellSize;

      this.context.fillStyle = i === 0 ? Colors.red : Colors.tomato;
      this.context.fillRect(x, y, w, h);

      this.context.strokeStyle = Colors.white;
      this.context.lineWidth = this.lineWidth;
      this.context.strokeRect(x, y, w, h);
    });
  }
}

export default Snake;
