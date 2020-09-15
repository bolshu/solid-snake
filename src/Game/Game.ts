import { TContext } from '../Canvas';
import { TCellSize } from '../Abstract/Celled';
import Colors from '../colors';
import Field, { TFieldSize } from '../Field';
import Snake, { TPosition } from '../Snake';

import ARROW_KEYS, { TDirectonKeys, TDirectonValues } from './arrowKeys';
import {
  CELL_SIZE,
  FIELD_SIZE,
  SPEED,
  SNAKE_POSITION,
  DIRECTION,
} from './constants';

interface IGame {
  start(): void;
}

type TSpeed = number;

class Game implements IGame {
  private readonly context: TContext;

  private readonly field: Field;

  private readonly snake: Snake;

  private readonly cellSize: TCellSize = CELL_SIZE;

  private readonly fieldSize: TFieldSize = FIELD_SIZE;

  private speed: TSpeed = SPEED;

  private snakePosition: TPosition = SNAKE_POSITION;

  private direction: TDirectonKeys = DIRECTION;

  constructor(context: TContext) {
    this.context = context;
    this.field = new Field(this.context, this.cellSize, this.fieldSize);
    this.snake = new Snake(this.context, this.cellSize);

    this.tick = this.tick.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);

    this.addKeydownListener();
  }

  private static isKeyValid(key: TDirectonValues): boolean {
    return Object.values(ARROW_KEYS).includes(key);
  }

  private isDirectionValid(direction: TDirectonKeys): boolean {
    return (
      (this.direction === 'UP' && direction !== 'DOWN')
      || (this.direction === 'LEFT' && direction !== 'RIGHT')
      || (this.direction === 'DOWN' && direction !== 'UP')
      || (this.direction === 'RIGHT' && direction !== 'LEFT')
    );
  }

  private keydownHandler(e: KeyboardEvent): void {
    if (!Game.isKeyValid(<TDirectonValues>e.code)) return;

    if (this.isCrashed()) {
      this.restart();
    }

    const direction = <TDirectonKeys>e.code.toUpperCase().replace('ARROW', '').trim();

    if (this.isDirectionValid(direction)) {
      this.direction = direction;
    }
  }

  private addKeydownListener(): void {
    window.addEventListener('keydown', this.keydownHandler);
  }

  private moveSnake(): void {
    const [col, row] = this.snakePosition[0];
    let nextCol = col;
    let nextRow = row;

    if (this.direction === 'UP') {
      nextRow -= 1;
    }

    if (this.direction === 'RIGHT') {
      nextCol += 1;
    }

    if (this.direction === 'DOWN') {
      nextRow += 1;
    }

    if (this.direction === 'LEFT') {
      nextCol -= 1;
    }

    const next: TPosition = [[nextCol, nextRow], ...this.snakePosition];
    this.snakePosition = next.slice(0, -1);
  }

  private isOufOfField(): boolean {
    return this.snakePosition.some(([col, row]) => (
      col > this.fieldSize
      || col < 1
      || row > this.fieldSize
      || row < 1
    ));
  }

  private isCrashed(): boolean {
    return this.isOufOfField();
    // TODO: add check this.isSelfDestruction()
  }

  private clear(): void {
    const { width, height } = this.context.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  private draw(): void {
    this.field.draw();
    this.snake.draw(this.snakePosition);
  }

  private render(): void {
    this.clear();
    this.draw();
  }

  private tick(): void {
    if (this.isCrashed()) {
      this.speed = SPEED;
      this.field.toggleColor();
    } else {
      this.moveSnake();
    }

    this.render();
    window.setTimeout(this.tick, this.speed);
  }

  private setDefaultParams(): void {
    this.speed = SPEED;
    this.snakePosition = SNAKE_POSITION;
    this.direction = DIRECTION;
  }

  private restart(): void {
    this.setDefaultParams();

    if (this.field.color !== Colors.black) {
      this.field.toggleColor();
    }
  }

  public start(): void {
    window.setTimeout(this.tick, this.speed);
  }
}

export default Game;
