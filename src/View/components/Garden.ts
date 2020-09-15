import AbstractCelledComponent from './AbstractCelledComponent';
import { TFieldSize } from '../../Game/Elements/Field';

class Garden extends AbstractCelledComponent<TFieldSize> {
  public draw(size: TFieldSize): void {
    this.drawCell(
      this.cellSize,
      this.cellSize,
      this.cellSize * size,
      this.cellSize * size,
    );

    for (let row = 1; row <= size; row += 1) {
      for (let col = 1; col <= size; col += 1) {
        this.drawCell(
          this.cellSize * col,
          this.cellSize * row,
          this.cellSize,
          this.cellSize,
        );
      }
    }
  }
}

export default Garden;
