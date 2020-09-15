import { TContext } from './types';
import {
  TGardenSize,
  TCoordinates,
  TScoreValue,
} from '../types';
import COLORS from './colors';

import Canvas from './Canvas';
import Garden from './components/Garden';
import Snake from './components/Snake';
import Apple from './components/Apple';
import Score from './components/Score';

type TRenderParams = {
  garden: TGardenSize;
  snake: TCoordinates[];
  apple: TCoordinates;
  score: TScoreValue;
};

class View {
  private readonly canvas: Canvas;

  private readonly context: TContext;

  private readonly garden: Garden;

  private readonly snake: Snake;

  private readonly apple: Apple;

  private readonly score: Score;

  constructor() {
    this.canvas = Canvas.getInstance();
    this.context = this.canvas.context;
    this.garden = new Garden(this.context);
    this.snake = new Snake(this.context);
    this.apple = new Apple(this.context);
    this.score = new Score(this.context);
  }

  private clear(): void {
    const { width, height } = this.context.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  private drawBackground(): void {
    const { width, height } = this.context.canvas;

    this.context.fillStyle = COLORS.BLACK;
    this.context.fillRect(0, 0, width, height);
  }

  private drawGarden(size: TGardenSize): void {
    this.garden.draw(size);
  }

  private drawSnake(coordinates: TCoordinates[]): void {
    this.snake.draw(coordinates);
  }

  private drawApple(coordinates: TCoordinates): void {
    this.apple.draw(coordinates);
  }

  private drawScore(score: TScoreValue): void {
    this.score.draw(score);
  }

  private drawAll({
    garden,
    snake,
    apple,
    score,
  }: TRenderParams): void {
    this.drawBackground();
    this.drawGarden(garden);
    this.drawSnake(snake);
    this.drawApple(apple);
    this.drawScore(score);
  }

  public update(args: TRenderParams): void {
    this.clear();
    this.drawAll(args);
  }
}

export default View;
