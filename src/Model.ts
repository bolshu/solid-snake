import {
  TGardenSize,
  TScoreValue,
  TSpeedValue,
  TCoordinates,
  TDirectonKeys,
} from './types';

const FIELD_SIZE: TGardenSize = 10;
const SPEED = 500;
const SCORE: TScoreValue = 0;
const DIRECTION: TDirectonKeys = 'DOWN';
const SNAKE: TCoordinates[] = [[1, 5], [1, 4], [1, 3], [1, 2], [1, 1]];

class Model {
  public readonly fieldSize = FIELD_SIZE;

  private speed: TSpeedValue;

  private score: TScoreValue;

  private direction: TDirectonKeys;

  private field: TCoordinates[];

  private snake: TCoordinates[];

  private apple: TCoordinates;

  constructor() {
    this.speed = SPEED;
    this.score = SCORE;
    this.direction = DIRECTION;
    this.field = this.getFieldCoordinates();
    this.snake = SNAKE;
    this.apple = this.getFoodCoordinates();
  }

  private getFieldCoordinates(): TCoordinates[] {
    const result: TCoordinates[] = [];

    for (let col = 0; col < this.fieldSize; col += 1) {
      for (let row = 0; row < this.fieldSize; row += 1) {
        result.push([col, row]);
      }
    }

    return result;
  }

  private getAvailableCoordinates(): TCoordinates[] {
    return this.field.filter(([fieldCol, fieldRow]) => (
      this.snake.every(([snakeCol, snakeRow]) => (
        fieldCol !== snakeCol
        && fieldRow !== snakeRow
      ))
    ));
  }

  private getFoodCoordinates(): TCoordinates {
    const availableCoordinates = this.getAvailableCoordinates();
    const randomCoordinatesIndex = Math.floor(Math.random() * availableCoordinates.length - 1);

    return availableCoordinates[randomCoordinatesIndex];
  }

  private updateFood(): void {
    this.apple = this.getFoodCoordinates();
  }

  private getSnakeHead(): TCoordinates {
    return this.snake[0];
  }

  private isSnakeGetApple(): boolean {
    const [snakeHeadCol, snakeHeadRow] = this.getSnakeHead();
    const [foodCol, foodRow] = this.apple;

    return snakeHeadCol === foodCol && snakeHeadRow === foodRow;
  }

  private growSnake(): void {
    const [foodCol, foodRow] = this.apple;
    const next: TCoordinates[] = [[foodCol, foodRow], ...this.snake];

    this.snake = next.slice();
  }

  private moveSnake(): void {
    const [snakeCol, snakeRow] = this.getSnakeHead();
    let nextCol = snakeCol;
    let nextRow = snakeRow;

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

    const next: TCoordinates[] = [[nextCol, nextRow], ...this.snake];
    this.snake = next.slice(0, -1);
  }

  private updateSnake(): void {
    if (this.isSnakeGetApple()) {
      this.growSnake();
    } else {
      this.moveSnake();
    }
  }

  private isOufOfField(): boolean {
    return this.snake.some(([col, row]) => (
      col > this.field.length
      || col < 0
      || row > this.field.length
      || row < 0
    ));
  }

  private isSnakeEatsItself(): boolean {
    const [headCol, headRow] = this.getSnakeHead();

    return this.snake.some(([bodyCol, bodyRow], index) => (
      index !== 0
      && headCol === bodyCol
      && headRow === bodyRow
    ));
  }

  private isCrashed(): boolean {
    return this.isOufOfField() || this.isSnakeEatsItself();
  }

  private update(): void {
    if (this.isCrashed()) {
      this.speed = SPEED;
    } else {
      this.updateSnake();
      this.updateFood();
    }
  }
}

export default Model;
