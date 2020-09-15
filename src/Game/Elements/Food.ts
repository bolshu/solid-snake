import Colors from '../colors';
import { TPosition } from '../Abstract/Drawned';
import Celled from '../Abstract/Celled';

class Food extends Celled {
  public draw(coordinates: TPosition): void {
    const [col, row] = coordinates;
    const x = this.cellSize * col;
    const y = this.cellSize * row;
    const w = this.cellSize;
    const h = this.cellSize;

    this.context.fillStyle = Colors.tomato;
    this.context.fillRect(x, y, w, h);

    this.context.strokeStyle = Colors.white;
    this.context.strokeRect(x, y, w, h);
  }
}

export default Food;
