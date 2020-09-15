import {
  TGardenSize,
  TScoreValue,
  TSpeedValue,
  TCoordinates,
  TDirecton,
} from './types';

const DIRECTIONS: TDirecton[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
const GARDEN_SIZE: TGardenSize = 10;
const SPEED = 500;
const SPEED_UP_VALUE = 20;
const SCORE: TScoreValue = 0;
const DIRECTION: TDirecton = 'DOWN';
const SNAKE: TCoordinates[] = [[1, 5], [1, 4], [1, 3], [1, 2], [1, 1]];

class Model {
  public readonly gardenSize = GARDEN_SIZE;

  private speed: TSpeedValue;

  private score: TScoreValue;

  private currentDirection: TDirecton;

  private nextDirection: TDirecton;

  private readonly garden: TCoordinates[];

  private currentSnake: TCoordinates[];

  private prevSnake: TCoordinates[];

  private apple: TCoordinates;

  constructor() {
    this.speed = SPEED;
    this.score = SCORE;
    this.currentDirection = DIRECTION;
    this.nextDirection = DIRECTION;
    this.garden = this.getGardenCoordinates();
    this.currentSnake = SNAKE;
    this.prevSnake = SNAKE;
    this.apple = this.getAppleCoordinates();
  }

  private getGardenCoordinates(): TCoordinates[] {
    const result: TCoordinates[] = [];

    for (let col = 1; col <= this.gardenSize; col += 1) {
      for (let row = 1; row <= this.gardenSize; row += 1) {
        result.push([col, row]);
      }
    }

    return result;
  }

  private getEmptyCoordinates(): TCoordinates[] {
    return this.garden.filter(([gardenCol, gardenRow]) => (
      this.currentSnake.every(([snakeCol, snakeRow]) => !(
        gardenCol === snakeCol
        && gardenRow === snakeRow
      ))
    ));
  }

  private getAppleCoordinates(): TCoordinates {
    const emptyCoordinates = this.getEmptyCoordinates();
    const randomEmptyCoordinatesIndex = Math.round(Math.random() * this.getGardenSize + 1);

    return emptyCoordinates[randomEmptyCoordinatesIndex];
  }

  private getSnakeHead(): TCoordinates {
    return this.currentSnake[0];
  }

  private isSnakeGetApple(): boolean {
    const [snakeHeadCol, snakeHeadRow] = this.getSnakeHead();
    const [appleCol, appleRow] = this.apple;

    return snakeHeadCol === appleCol && snakeHeadRow === appleRow;
  }

  private updateApple(): void {
    if (this.isSnakeGetApple()) {
      this.apple = this.getAppleCoordinates();
    }
  }

  private growSnake(): void {
    this.upScore();
    this.upSpeed();
    this.currentSnake = [this.apple, ...this.prevSnake];
  }

  private moveSnake(): void {
    const [snakeCol, snakeRow] = this.getSnakeHead();
    let nextCol = snakeCol;
    let nextRow = snakeRow;

    if (this.currentDirection === 'UP') {
      nextRow -= 1;
    }

    if (this.currentDirection === 'RIGHT') {
      nextCol += 1;
    }

    if (this.currentDirection === 'DOWN') {
      nextRow += 1;
    }

    if (this.currentDirection === 'LEFT') {
      nextCol -= 1;
    }

    this.prevSnake = this.currentSnake;
    const next: TCoordinates[] = [[nextCol, nextRow], ...this.currentSnake];
    this.currentSnake = next.slice(0, -1);
  }

  private updateSnake(): void {
    this.moveSnake();

    if (this.isSnakeGetApple()) {
      this.growSnake();
    }
  }

  private isOufOfGarden(): boolean {
    return this.currentSnake.some(([col, row]) => (
      col > this.getGardenSize
      || col < 1
      || row > this.getGardenSize
      || row < 1
    ));
  }

  private isSnakeEatsItself(): boolean {
    const [headCol, headRow] = this.getSnakeHead();

    return this.currentSnake.some(([bodyCol, bodyRow], index) => (
      index !== 0
      && headCol === bodyCol
      && headRow === bodyRow
    ));
  }

  private isCrashed(): boolean {
    return this.isOufOfGarden() || this.isSnakeEatsItself();
  }

  private static isDirectionAvailable(direction: TDirecton): boolean {
    return DIRECTIONS.includes(direction);
  }

  private isDirectionCorrect(direction: TDirecton): boolean {
    return (
      (this.currentDirection === 'UP' && direction !== 'DOWN')
      || (this.currentDirection === 'LEFT' && direction !== 'RIGHT')
      || (this.currentDirection === 'DOWN' && direction !== 'UP')
      || (this.currentDirection === 'RIGHT' && direction !== 'LEFT')
    );
  }

  private isDirectionValid(direction: TDirecton): boolean {
    return this.isDirectionCorrect(direction) && Model.isDirectionAvailable(direction);
  }

  private upSpeed(): void {
    this.speed -= SPEED_UP_VALUE;
  }

  private upScore(): void {
    this.score += 1;
  }

  public setNextDirection(direction: TDirecton): void {
    if (this.isDirectionValid(direction)) {
      this.nextDirection = direction;
    }
  }

  public resetValues(): void {
    this.speed = SPEED;
    this.score = SCORE;
    this.currentDirection = DIRECTION;
    this.nextDirection = DIRECTION;
    this.currentSnake = SNAKE;
    this.prevSnake = SNAKE;
    this.apple = this.getAppleCoordinates();
  }

  public update(): void {
    if (!this.isCrashed()) {
      this.updateSnake();
      this.updateApple();
    }

    this.currentDirection = this.nextDirection;
  }

  get getGardenSize(): TGardenSize {
    return this.gardenSize;
  }

  get getSnake(): TCoordinates[] {
    return this.currentSnake;
  }

  get getApple(): TCoordinates {
    return this.apple;
  }

  get getScore(): TScoreValue {
    return this.score;
  }

  get getSpeed(): TSpeedValue {
    return this.speed;
  }

  get getIsCrashed(): boolean {
    return this.isCrashed();
  }
}

export default Model;
