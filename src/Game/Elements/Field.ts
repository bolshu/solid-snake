import { TContext } from './Canvas';
import Colors from './colors';
import Celled, { TCellSize } from './Abstract/Celled';

export type TFieldSize = number;

type TColor = string;

type TCellWidth = number;
type TCellHeight = number;
type TCellX = number;
type TCellY = number;

class Field extends Celled {
  private readonly size: TFieldSize;

  private clr: TColor;

  constructor(context: TContext, cellSize: TCellSize, size: TFieldSize) {
    super(context, cellSize);
    this.size = size;
    this.clr = Colors.black;
  }

  private drawBackground(): void {
    const { width, height } = this.context.canvas;

    this.context.fillStyle = Colors.black;
    this.context.fillRect(0, 0, width, height);
  }

  private drawCell(x: TCellX, y: TCellY, w: TCellWidth, h: TCellHeight): void {
    this.context.fillStyle = this.clr;
    this.context.fillRect(x, y, w, h);

    this.context.strokeStyle = Colors.white;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeRect(x, y, w, h);
  }

  private drawCells(): void {
    this.drawCell(
      this.cellSize,
      this.cellSize,
      this.cellSize * this.size,
      this.cellSize * this.size,
    );

    for (let row = 1; row <= this.size; row += 1) {
      for (let col = 1; col <= this.size; col += 1) {
        this.drawCell(
          this.cellSize * col,
          this.cellSize * row,
          this.cellSize,
          this.cellSize,
        );
      }
    }
  }

  public toggleColor(): void {
    this.clr = this.clr === Colors.black ? Colors.red : Colors.black;
  }

  public draw(): void {
    this.drawBackground();
    this.drawCells();
  }

  get color(): TColor {
    return this.clr;
  }
}

export default Field;
