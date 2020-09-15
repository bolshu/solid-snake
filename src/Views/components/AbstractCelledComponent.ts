import {
  TCellWidth,
  TCellHeight,
  TCellX,
  TCellY,
} from '../types';
import COLORS, { TColor } from '../colors';
import AbstractComponent from './AbstractComponent';

abstract class AbstractCelledComponent<D> extends AbstractComponent<D> {
  protected readonly lineWidth: number = 1;

  protected drawCell(
    x: TCellX,
    y: TCellY,
    w: TCellWidth,
    h: TCellHeight,
    fill?: TColor,
  ): void {
    this.context.fillStyle = fill ?? COLORS.BACKGROUND;
    this.context.fillRect(x, y, w, h);

    this.context.strokeStyle = COLORS.STROKE;
    this.context.lineWidth = this.lineWidth;
    this.context.strokeRect(x, y, w, h);
  }
}

export default AbstractCelledComponent;
